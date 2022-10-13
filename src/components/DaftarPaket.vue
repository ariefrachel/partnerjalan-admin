<template>
  <div>
    <div class="partnerHeader d-flex justify-content-between">
      <h2>Daftar Paket Wisata</h2>
      <b-button class="btn btn-primary" v-b-modal.modal-paket
        >Tambah Paket</b-button
      >
      <b-modal
        id="modal-paket"
        ref="modal-paket"
        hide-footer
        centered
        title="Tambah Paket Wisata"
      >
        <div style="padding: 14px">
          <div v-if="message" class="alert alert-secondary" role="alert">
            {{ message }}
          </div>

          <b-form-group label="Nama Paket" label-cols-lg="6">
            <b-form-input
              v-model="namapaket"
              placeholder="Nama Paket"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Hari" label-cols-lg="6">
            <b-form-input v-model="hari" placeholder="Hari"></b-form-input>
          </b-form-group>
          <b-form-group label="Harga" label-cols-lg="6">
            <b-form-input v-model="harga" placeholder="Harga"></b-form-input>
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
    <div class="paket mt-3" v-for="paket in paket" :key="paket.id">
      <div class="daftarPaket mt-4">
        <div class="row">
          <div class="col-lg-3 col-12">
            <div class="paketImg">
              <img
                :src="pathContact + paket.pathgambar"
                alt="paketJogja1"
                style="width: 100%"
              />
            </div>
          </div>
          <div class="col-lg-7 col-12 mt-lg-0 mt-3">
            <h5>Paket Wisata {{ paket.namapaket }}</h5>
            <span style="color: #55c9d3">{{ paket.hari }}</span>
            <div class="mt-3 wisataList">
              <span class="fw-bolder">Tempat Wisata</span>
              <ul class="mt-1 row" style="margin-left: -0.75em">
                <li
                  class="col-lg-6 col-12"
                  v-for="wisata in paket.paketwisata"
                  :key="wisata.id"
                >
                  {{ wisata.wisata.tempatwisata }}
                </li>
              </ul>
            </div>
            <div class="harga mt-4">
              <h5 style="color: #55c9d3">{{ paket.harga }}</h5>
            </div>
          </div>
          <div class="col-lg-2 col-12">
            <div class="row">
              <button class="col-6 btn btn-outline-warning">Edit</button>
              <button class="col-6 btn btn-outline-danger" @click="del(paket)">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import UploadService from "../services/UploadFilesService";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,
      kotaid: [],
      message: "",
      namapaket: "",
      hari: "",
      harga: "",
      paket: [],
      kota: "",
      pathContact: this.$pathApi,
    };
  },
  mounted() {
    this.load();
    this.loadkota();
  },
  methods: {
    showModal() {
      this.$refs["modal-paket"].show();
    },
    hideModal() {
      this.$refs["modal-paket"].hide();
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.message = "";
    },
    upload() {
      // axios
      //   .post(this.$pathApi + "api/dashboard/paket", this.kotaid)
      //   .then((res) => {
      //     this.hideModal();
      //     this.load();
      //     this.kotaid = [];
      //   });
      UploadService.uploadPaket(
        this.currentImage,
        this.kotaid,
        this.namapaket,
        this.hari,
        this.harga
      )
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.namapaket = "";
          this.hari = "";
          this.harga = "";
          this.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.currentImage = undefined;
        });
    },
    async addKota() {
      try {
        await axios.post(this.$pathApi + "api/dashboard/paket", this.kotaid);

        this.load();
      } catch (e) {
        console.log(e);
      }
    },
    async load() {
      try {
        const paket = await axios.get(this.$pathApi + "api/dashboard/paket", {
          headers: {
            "ngrok-skip-browser-warning": 1,
          },
        });

        this.paket = paket.data;
      } catch (e) {
        console.log(e);
      }
    },
    async loadkota() {
      try {
        const kota = await axios.get(this.$pathApi + "api/dashboard/kota", {
          headers: {
            "ngrok-skip-browser-warning": 1,
          },
        });

        this.kota = kota.data;
      } catch (e) {
        console.log(e);
      }
    },
    del(delpaket) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        axios
          .delete(this.$pathApi + "api/dashboard/paket/" + delpaket.id)
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
.daftarPaket {
  padding: 21px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 16px;
}
.paketImg {
  position: relative;
  height: 220px;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}
.paketImg img {
  position: absolute;
  height: 100%;
}
</style>