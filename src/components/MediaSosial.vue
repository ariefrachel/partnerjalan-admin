<template>
  <div class="mediaSosial">
    <div class="medsosHeader d-flex justify-content-between">
      <h2>Media Sosial</h2>
      <div>
        <b-button class="btn btn-primary" v-b-modal.modal-medsos
          >Tambah</b-button
        >
        <b-modal
          id="modal-medsos"
          ref="modal-medsos"
          hide-footer
          centered
          title="Tambah Media Sosial"
        >
          <div style="padding: 14px">
            <div v-if="message" class="alert alert-secondary" role="alert">
              {{ message }}
            </div>
            <b-form-group label="Nama Media Sosial" label-cols-lg="6">
              <b-form-input
                v-model="form.namamedsos"
                placeholder="Media sosial"
              ></b-form-input>
            </b-form-group>
            <br />
            <b-form-group
              label="Upload icon"
              label-for="form-image"
              label-cols-lg="4"
            >
              <b-input-group>
                <input
                  type="file"
                  accept="image/*"
                  ref="file"
                  @change="selectImage"
                />
              </b-input-group>
            </b-form-group>
            <div v-if="form.previewImage">
              <div>
                <img
                  class="preview my-3"
                  :src="form.previewImage"
                  alt=""
                  style="width: 50%"
                />
              </div>
            </div>
            <br />
            <div class="d-flex justify-content-end">
              <b-button class="btn mt-3 me-3" id="hide-btn" @click="hideModal"
                >Batal</b-button
              >
              <b-button
                class="btn btn-primary mt-3"
                :disabled="!form.currentImage"
                @click="upload"
                v-show="!updateSubmit"
                >Tambah Medsos</b-button
              >
              <b-button
                class="btn btn-primary mt-3"
                :disabled="!form.currentImage"
                @click="update(form)"
                v-show="updateSubmit"
                >Update Medsos</b-button
              >
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-lg-3 g-4" style="margin-top: 2px">
      <div class="col" v-for="media in medsos" :key="media.id">
        <div class="card kontakContent">
          <div class="card-body">
            <div class="kontakLogo d-flex align-items-center">
              <img :src="pathMedsos + media.pathicon" alt="ikon" />
              <a v-bind:href="media.link" target="_blank">
                <p class="ms-3 mt-2">{{ media.namamedsos }}</p>
              </a>
            </div>
            <div style="float: right; margin-top: 7px">
              <button
                class="btn btn-edit"
                style="margin-right: 14px"
                @click="edit(media)"
              >
                Edit
              </button>
              <button class="btn btn-delete" @click="del(media)">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import UploadService from "../services/UploadFilesService";
import UpdateService from "../services/UpdateFilesService";
import http from "../http-common";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      form: {
        currentImage: undefined,
        previewImage: undefined,
        namamedsos: "",
      },
      message: "",
      medsos: [],
      pathMedsos: this.$pathApi,
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-medsos"].show();
    },
    hideModal() {
      this.$refs["modal-medsos"].hide();
    },
    selectImage() {
      this.form.currentImage = this.$refs.file.files.item(0);
      this.form.previewImage = URL.createObjectURL(this.form.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadMedsos(this.form.currentImage, this.form.namamedsos)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.form.namamedsos = "";
          this.form.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.form.currentImage = undefined;
        });
    },
    async load() {
      try {
        const medsos = await axios.get(this.$pathApi + "api/dashboard/medsos", {
          headers: {
            "ngrok-skip-browser-warning": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.medsos = medsos.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    edit(editmedsos) {
      this.showModal();
      this.updateSubmit = true;
      this.form.id = editmedsos.id;
      this.form.namamedsos = editmedsos.namamedsos;
      this.form.previewImage = editmedsos.previewImage;
    },
    update(form) {
      UpdateService.updateMedsos(
        form.id,
        this.form.currentImage,
        this.form.namamedsos
      )
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.form.namamedsos = "";
          this.form.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.form.currentImage = undefined;
        });
    },
    del(delmedsos) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http
          .delete("api/dashboard/medsos/" + delmedsos.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.load();
            console.log(res);
          });
      }
    },
  },
};
</script>
  
  <style>
</style>