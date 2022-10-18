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
                v-model="namamedsos"
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
            <div v-if="previewImage">
              <div>
                <img
                  class="preview my-3"
                  :src="previewImage"
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
                :disabled="!currentImage"
                @click="upload"
                >Tambah Data</b-button
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
              <button class="btn btn-edit" style="margin-right: 14px">
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
import http from "../http-common";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,

      message: "",
      namamedsos: "",
      medsos: [],
      pathMedsos: this.$pathApi,
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
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadMedsos(this.currentImage, this.namamedsos)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.namamedsos = "";
          this.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.currentImage = undefined;
        });
    },
    async load() {
      try {
        const medsos = await axios.get(this.$pathApi + "api/dashboard/medsos", {
          headers: {
            "ngrok-skip-browser-warning": 1,
          },
        });

        this.medsos = medsos.data;
      } catch (e) {
        console.log(e);
      }
    },
    del(delmedsos) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http.delete("api/dashboard/medsos/" + delmedsos.id).then((res) => {
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