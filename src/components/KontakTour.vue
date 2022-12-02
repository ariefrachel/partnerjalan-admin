<template>
  <div class="kontakTour">
    <div
      class="kontakHeader d-flex justify-content-between"
      data-aos="fade-down"
      data-aos-duration="800"
    >
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
                v-model="form.contact"
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
                >Tambah Kontak</b-button
              >
              <b-button
                class="btn btn-primary mt-3"
                :disabled="!form.currentImage"
                @click="update(form)"
                v-show="updateSubmit"
                >Update Kontak</b-button
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
      <div class="col" v-for="cont in kontak" :key="cont.id">
        <div
          class="card kontakContent"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="50"
        >
          <div class="card-body">
            <div class="kontakLogo d-flex align-items-center">
              <img :src="pathContact + cont.path" alt="ikon" />
              <p class="ms-3 mt-2">{{ cont.contact }}</p>
            </div>
            <div style="float: right; margin-top: 7px">
              <button
                class="btn btn-edit"
                style="margin-right: 14px"
                @click="edit(cont)"
              >
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
        contact: "",
      },

      message: "",
      kontak: "",
      updateSubmit: false,
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
      this.form.currentImage = this.$refs.file.files.item(0);
      this.form.previewImage = URL.createObjectURL(this.form.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadKontak(this.form.currentImage, this.form.contact)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.form.contact = "";
          this.form.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.form.currentImage = undefined;
        });
    },
    async load() {
      try {
        const contacts = await axios.get(
          this.$pathApi + "api/dashboard/contact",
          {
            headers: {
              "Bypass-Tunnel-Reminder": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        this.kontak = contacts.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    edit(editkontak) {
      this.showModal();
      this.updateSubmit = true;
      this.form.id = editkontak.id;
      this.form.contact = editkontak.contact;
      this.form.previewImage = editkontak.previewImage;
    },
    update(form) {
      UpdateService.updateKontak(
        form.id,
        this.form.currentImage,
        this.form.contact
      )
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.form.contact = "";
          this.form.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.form.currentImage = undefined;
        });
    },
    del(delkontak) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http
          .delete("api/dashboard/contact/" + delkontak.id, {
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