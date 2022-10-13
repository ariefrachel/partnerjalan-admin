<template>
  <div class="wisataterbaik" id="content">
    <SidebarNav />
    <div class="Header d-flex justify-content-between">
      <h2>Kota</h2>
      <div>
        <b-button class="btn btn-primary" v-b-modal.modal-kota>Tambah</b-button>
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
              <b-form-input
                v-model="namakota"
                placeholder="Kota"
              ></b-form-input>
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
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
      style="margin-top: 21px"
    >
      <div class="col" :key="kategori.id" v-for="kategori in kota">
        <div class="card testimoniContent">
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
                    <button class="btn btn-edit">Edit</button>
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
import SidebarNav from "@/components/SidebarNav.vue";
import http from "../http-common";
export default {
  name: "WisataKota",
  components: {
    SidebarNav,
  },
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,
      kota: "",
      namakota: "",
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
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadKota(this.currentImage, this.namakota)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.namakota = "";
          this.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.currentImage = undefined;
        });
    },
    async load() {
      try {
        const kota = await http.get("api/dashboard/kota", {
          headers: {
            "ngrok-skip-browser-warning": 1,
          },
        });

        this.kota = kota.data;
      } catch (e) {
        console.log(e);
      }
    },
    del(kota) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http.delete("api/dashboard/kota/" + kota.id).then((res) => {
          this.load();
          console.log(res);
        });
      }
    },
  },
};
</script>
  