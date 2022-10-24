<template>
  <div class="wisataterbaik" id="content">
    <SidebarNav />
    <div
      class="Header d-flex justify-content-between"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <h2>Kota</h2>
      <div class="input-group" style="width: 450px">
        <span class="input-group-text d-md-block d-none" id="basic-addon1"
          >Ketik Pencarian</span
        >
        <input
          type="text"
          v-model="cari"
          placeholder="Cari Kota"
          class="form-control me-3 d-md-block d-none"
          @keyup="cariKota"
        />
      </div>

      <b-button class="btn btn-primary" v-b-modal.modal-kota>Tambah</b-button>
    </div>

    <div>
      <b-modal
        id="modal-kota"
        ref="modal-kota"
        hide-footer
        centered
        title="Tambah Kontak"
      >
        <div style="padding: 14px">
          <div v-if="message" class="alert alert-secondary" role="alert">
            {{ message }}
          </div>
          <b-form-group label="Nama Kota" label-cols-lg="4">
            <b-form-input v-model="form.kota" placeholder="Kota"></b-form-input>
          </b-form-group>
          <br />
          <b-form-group
            label="Upload gambar"
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
              >Tambah Data</b-button
            >
            <b-button
              class="btn btn-primary mt-3"
              :disabled="!form.currentImage"
              @click="update(form)"
              v-show="updateSubmit"
              >Update Data</b-button
            >
          </div>
        </div>
      </b-modal>
    </div>
    <div class="input-group mt-3">
      <span class="input-group-text d-md-none d-block" id="basic-addon1"
        >Ketik</span
      >
      <input
        type="text"
        v-model="cari"
        placeholder="Cari Paket"
        class="form-control d-md-none d-block"
        @keyup="cariKota"
      />
    </div>
    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
      style="margin-top: 21px"
    >
      <div class="col" :key="kategori.id" v-for="kategori in kota">
        <div
          class="card testimoniContent"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div class="testiImage">
            <img
              :src="pathImg + kategori.pathgambar"
              class="card-img-top"
              alt="..."
              style="height: 100%"
            />
          </div>
          <div class="card-body">
            <div style="margin-top: 7px">
              <div class="row">
                <div class="col-12">
                  <h6 class="pe-2">Paket {{ kategori.kota }}</h6>
                </div>
                <div class="row justify-content-end mt-2">
                  <div class="col-4">
                    <button class="btn btn-edit" @click="edit(kategori)">
                      Edit
                    </button>
                  </div>
                  <div class="col-4">
                    <button class="btn btn-delete" @click="del(kategori)">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
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
import SidebarNav from "@/components/SidebarNav.vue";
import http from "../http-common";
export default {
  name: "WisataKota",
  components: {
    SidebarNav,
  },
  data() {
    return {
      form: {
        currentImage: undefined,
        previewImage: undefined,
        kota: "",
      },
      cari: "",
      kota: [],
      updateSubmit: false,
      pathImg: this.$pathApi,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-kota"].show();
    },
    hideModal() {
      this.$refs["modal-kota"].hide();
    },
    selectImage() {
      this.form.currentImage = this.$refs.file.files.item(0);
      this.form.previewImage = URL.createObjectURL(this.form.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadKota(this.form.currentImage, this.form.kota)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.form.kota = "";
          this.form.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.form.currentImage = undefined;
        });
    },
    async load() {
      try {
        const kota = await http.get("api/dashboard/kota", {
          headers: {
            "ngrok-skip-browser-warning": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.kota = kota.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    edit(editkota) {
      this.showModal();
      this.updateSubmit = true;
      this.form.id = editkota.id;
      this.form.kota = editkota.kota;
      this.form.currentImage = editkota.currentImage;
    },
    update(form) {
      UpdateService.updateKota(form.id, this.form.currentImage, this.form.kota)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.form.kota = "";
          this.form.currentImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.form.currentImage = undefined;
        });
    },
    del(kota) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http
          .delete("api/dashboard/kota/" + kota.id, {
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
    async cariKota() {
      try {
        if (this.cari == "") {
          this.load();
        } else {
          const cari = await http.get(
            "api/dashboard/kota/search/" + this.cari,
            {
              headers: {
                "ngrok-skip-browser-warning": 1,
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );

          this.kota = cari.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
  