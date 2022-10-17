<template>
  <div>
    <div class="partnerHeader d-flex justify-content-between">
      <h2>Daftar Paket Wisata</h2>
      <div class="d-flex">
        <b-button class="btn btn-secondary me-3" v-b-modal.modal-wisata
          >Tambah Wisata</b-button
        >
        <b-modal
          id="modal-wisata"
          ref="modal-wisata"
          centered
          hide-footer
          title="Tambah Tempat Wisata"
        >
          <form @submit.prevent="addWisata">
            <div class="d-block">
              <b-form-group label="Nama Paket" label-cols-lg="4">
                <b-form-select class="form-select" v-model="formWisata.paketid">
                  <template #first>
                    <b-form-select-option :value="null" disabled>
                      Pilih Paket
                    </b-form-select-option>
                  </template>
                  <b-form-select-option
                    :key="paket.id"
                    v-for="paket in paket"
                    :value="paket.id"
                    >{{ paket.namapaket }}</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>
              <br />
              <b-form-group label="Nama Tempat Wisata" label-cols-lg="4">
                <b-form-select
                  class="form-select"
                  v-model="formWisata.wisataid"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>
                      Pilih Tempat Wisata
                    </b-form-select-option>
                  </template>
                  <b-form-select-option
                    :key="tempat.id"
                    v-for="tempat in tempatwisata"
                    :value="tempat.id"
                    >{{ tempat.tempatwisata }}</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>
            </div>
            <br />
            <b-button class="mt-3" id="hide-btn" @click="hideModal"
              >Batal</b-button
            >
            <b-button class="mt-3 ms-3" type="submit" variant="primary" block
              >Tambah</b-button
            >
            <!-- <b-button
              class="mt-3"
              variant="warning"
              block
              type="button"
              @click="update(form)"
              v-show="updateSubmit"
              >Update</b-button
            > -->
          </form>
        </b-modal>
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
    </div>
    <div class="paket mt-3" v-for="paketwisata in paket" :key="paketwisata.id">
      <div class="daftarPaket mt-4">
        <div class="row">
          <div class="col-lg-3 col-12">
            <div class="paketImg">
              <img
                :src="pathContact + paketwisata.pathgambar"
                alt="paketJogja1"
                style="width: 100%"
              />
            </div>
          </div>
          <div class="col-lg-7 col-12 mt-lg-0 mt-3">
            <h5>Paket Wisata {{ paketwisata.namapaket }}</h5>
            <span style="color: #55c9d3">{{ paketwisata.hari }}</span>
            <p style="opacity: 0.7">{{ paketwisata.kota.kota }}</p>
            <div class="mt-3 wisataList">
              <span class="fw-bolder">Tempat Wisata</span>
              <ul class="mt-1 row" style="margin-left: -0.75em">
                <li
                  class="col-lg-6 col-12"
                  :key="twisata.id"
                  v-for="twisata in paketwisata.paketwisata"
                >
                  {{ twisata.wisata }}
                </li>
              </ul>
            </div>
            <div class="harga mt-4">
              <h5 style="color: #55c9d3">{{ paketwisata.harga }}</h5>
            </div>
          </div>
          <div class="col-lg-2 col-12">
            <div class="row">
              <button
                class="col-6 btn btn-outline-warning"
                @click="edit(paketwisata)"
              >
                Edit Kota
              </button>
              <br />
              <button
                class="col-6 btn btn-outline-danger"
                @click="del(paketwisata)"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-paketkota"
      ref="modal-paketkota"
      hide-footer
      centered
      title="Tambah Kota"
    >
      <div style="padding: 14px">
        <b-form-select class="form-select" v-model="form.kotaid">
          <template #first>
            <b-form-select-option :value="null" disabled>
              Pilih Kota
            </b-form-select-option>
          </template>
          <b-form-select-option
            :key="kota.id"
            v-for="kota in kota"
            :value="kota.id"
            >{{ kota.kota }}</b-form-select-option
          >
        </b-form-select>
        <br />
        <div class="d-flex justify-content-end">
          <b-button class="btn mt-3 me-3" id="hide-btn" @click="hideModal2"
            >Batal</b-button
          >
          <b-button
            class="mt-3 me-3"
            variant="warning"
            block
            type="button"
            @click="update()"
            >Tambah Kota</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import UploadService from "../services/UploadFilesService";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      formWisata: {
        paketid: [],
        wisataid: [],
      },
      form: {
        id: [],
        kotaid: [],
      },
      currentImage: undefined,
      previewImage: undefined,
      message: "",
      namapaket: "",
      hari: "",
      harga: "",
      paket: [],
      kota: "",
      tempatwisata: "",
      pathContact: this.$pathApi,
    };
  },
  mounted() {
    this.load();
    this.loadkota();
    this.loadWisata();
  },
  methods: {
    showModal() {
      this.$refs["modal-paket"].show();
    },
    hideModal() {
      this.$refs["modal-paket"].hide();
    },
    showModal2() {
      this.$refs["modal-paketkota"].show();
    },
    hideModal2() {
      this.$refs["modal-paketkota"].hide();
    },
    showModal3() {
      this.$refs["modal-wisata"].show();
    },
    hideModal3() {
      this.$refs["modal-wisata"].hide();
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadPaket(
        this.currentImage,
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

    edit(editKota) {
      this.showModal2();
      this.form.id = editKota.id;
      this.form.kotaid = editKota.kotaid;
    },
    async update() {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/paket/tambahkota/" + this.form.id,
          {
            kotaid: this.form.kotaid,
          }
        );
        this.hideModal2();
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
    async loadWisata() {
      try {
        const wisata = await axios.get(this.$pathApi + "api/dashboard/wisata", {
          headers: {
            "ngrok-skip-browser-warning": 1,
          },
        });

        this.tempatwisata = wisata.data;
      } catch (e) {
        console.log(e);
      }
    },
    async addWisata() {
      try {
        await axios.post(
          this.$pathApi + "api/dashboard/paketwisata",
          this.formWisata
        );
        this.hideModal3();
        this.load();
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