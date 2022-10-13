<template>
  <div class="kontakTour">
    <div class="kontakHeader d-flex justify-content-between">
      <h2>Kontak</h2>
      <div>
        <b-button class="btn btn-primary" v-b-modal.modal-kontak
          >Tambah</b-button
        >
        <b-modal
          id="modal-kontak"
          ref="modal-kontak"
          hide-footer
          centered
          title="Tambah Kontak"
        >
          <div style="padding: 14px">
            <div v-if="message" class="alert alert-secondary" role="alert">
              {{ message }}
            </div>
            <b-form-group label="Nama Kontak" label-cols-lg="4">
              <b-form-input
                v-model="kontak"
                placeholder="Kontak"
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
    <div
      class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4"
      style="margin-top: 2px"
    >
      <div class="col" v-for="cont in contact" :key="cont.id">
        <div class="card kontakContent">
          <div class="card-body">
            <div class="kontakLogo d-flex align-items-center">
              <img :src="pathContact + cont.path" alt="ikon" />
              <p class="ms-3 mt-2">{{ cont.contact }}</p>
            </div>
            <div style="float: right; margin-top: 7px">
              <button class="btn btn-edit" style="margin-right: 14px">
                Edit
              </button>
              <button class="btn btn-delete" @click="del(cont)">Hapus</button>
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
      kontak: "",
      contact: [],
      pathContact: this.$pathApi,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-kontak"].show();
    },
    hideModal() {
      this.$refs["modal-kontak"].hide();
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadKontak(this.currentImage, this.kontak)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.kontak = "";
          this.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.currentImage = undefined;
        });
    },
    async load() {
      try {
        const contacts = await axios.get(
          this.$pathApi + "api/dashboard/contact",
          {
            headers: {
              "ngrok-skip-browser-warning": 1,
            },
          }
        );

        this.contact = contacts.data;
      } catch (e) {
        console.log(e);
      }
    },
    del(delkontak) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http.delete("api/dashboard/contact/" + delkontak.id).then((res) => {
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