<template>
  <div>
    <div
      class="partnerHeader d-flex justify-content-between"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <h2>Paket Wisata</h2>
      <div class="input-group" style="width: 450px">
        <span class="input-group-text d-md-block d-none" id="basic-addon1"
          >Ketik Pencarian</span
        >
        <input
          type="text"
          v-model="cari"
          placeholder="Cari Paket"
          class="form-control d-md-block d-none"
          @keyup="cariPaket"
        />
      </div>
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
                    v-for="tempat in tempat"
                    :value="tempat.id"
                    >{{ tempat.tempatwisata }} ({{
                      tempat.kotaid
                    }})</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>
            </div>
            <br />
            <b-button class="mt-3" id="hide-btn" @click="hideModal3"
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
                v-model="formPaket.namapaket"
                placeholder="Nama Paket"
              ></b-form-input>
            </b-form-group>
            <!-- <b-form-group label="Hari" label-cols-lg="6">
              <b-form-input v-model="hari" placeholder="Hari"></b-form-input>
            </b-form-group> -->
            <b-form-group label="Hari" label-cols-lg="4">
              <b-form-select class="form-select" v-model="formPaket.hari">
                <template #first>
                  <b-form-select-option :value="null" disabled>
                    Pilih Hari
                  </b-form-select-option>
                </template>
                <b-form-select-option value="Paket 1 Hari"
                  >Paket 1 Hari</b-form-select-option
                >
                <b-form-select-option value="Paket 2 Hari"
                  >Paket 2 Hari</b-form-select-option
                >
                <b-form-select-option value="Paket 3 Hari"
                  >Paket 3 Hari</b-form-select-option
                >
                <b-form-select-option value="Paket 4 Hari"
                  >Paket 4 Hari</b-form-select-option
                >
                <b-form-select-option value="Paket 5 Hari"
                  >Paket 5 Hari</b-form-select-option
                >
                <b-form-select-option value="Paket 6 Hari"
                  >Paket 6 Hari</b-form-select-option
                >
                <b-form-select-option value="Paket 7 Hari"
                  >Paket 7 Hari</b-form-select-option
                >
              </b-form-select>
            </b-form-group>
            <b-form-group label="Harga" label-cols-lg="6">
              <b-form-input
                v-model="formPaket.harga"
                placeholder="Harga"
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
            <div v-if="formPaket.previewImage">
              <div>
                <img
                  class="preview my-3"
                  :src="formPaket.previewImage"
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
                :disabled="!formPaket.currentImage"
                @click="upload"
                v-show="!updateSubmit"
                >Tambah Paket</b-button
              >
              <b-button
                class="btn btn-primary mt-3"
                :disabled="!formPaket.currentImage"
                @click="updatePkt(formPaket)"
                v-show="updateSubmit"
                >Update Paket</b-button
              >
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <div class="input-group mt-3" data-aos="fade-down" data-aos-duration="800">
      <span class="input-group-text d-md-none d-block" id="basic-addon1"
        >Ketik</span
      >
      <input
        type="text"
        v-model="cari"
        placeholder="Cari Paket"
        class="form-control d-md-none d-block"
        @keyup="cariPaket"
      />
    </div>
    <div class="paket mt-3" v-for="paketwisata in paket" :key="paketwisata.id">
      <div
        class="daftarPaket mt-4"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="50"
      >
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
            <span style="opacity: 0.7">{{ paketwisata.kota?.kota }}</span>
            <span style="color: #55c9d3" class="ms-3">{{
              paketwisata.hari
            }}</span>
            <div class="mt-3 wisataList">
              <span class="fw-bolder">Tempat Wisata</span>
              <ul class="mt-1 row" style="margin-left: -0.75em">
                <li
                  class="col-lg-6 col-12"
                  :key="twisata.id"
                  v-for="twisata in paketwisata.paketwisata"
                >
                  {{ twisata.wisata?.tempatwisata }}
                  <button class="btn btn-sm" @click="delwisata(twisata)">
                    <i class="fas fa-trash" style="color: #dc3545"></i>
                  </button>
                </li>
              </ul>
            </div>
            <div class="harga mt-4">
              <h5 style="color: #55c9d3">{{ paketwisata.harga }}</h5>
            </div>
          </div>
          <div class="col-lg-2 col-12">
            <div class="row">
              <button class="btn btn-edit" @click="edit(paketwisata)">
                Edit Kota
              </button>
              <button class="btn btn-edit mt-3" @click="editPaket(paketwisata)">
                Edit Paket
              </button>
              <button
                class="btn btn-outline-danger mt-3"
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
import UpdateService from "../services/UpdateFilesService";
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
      formPaket: {
        currentImage: undefined,
        previewImage: undefined,
        namapaket: "",
        hari: [],
        harga: "RP. 000 - 000 / pack",
      },
      cari: "",
      message: "",
      paket: [],
      kota: "",
      tempat: "",
      twisata: "",
      pathContact: this.$pathApi,
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
    this.loadkota();
    this.loadWisata();
    this.getWisata();
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
      this.formPaket.currentImage = this.$refs.file.files.item(0);
      this.formPaket.previewImage = URL.createObjectURL(
        this.formPaket.currentImage
      );
      this.message = "";
    },
    upload() {
      UploadService.uploadPaket(
        this.formPaket.currentImage,
        this.formPaket.namapaket,
        this.formPaket.hari,
        this.formPaket.harga
      )
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.formPaket.namapaket = "";
          this.formPaket.hari = "";
          this.formPaket.harga = "RP. 000 - 000 / pack";
          this.formPaket.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.formPaket.currentImage = undefined;
        });
    },

    edit(editKota) {
      this.showModal2();
      this.form.id = editKota.id;
      this.form.kotaid = editKota.kotaid;
    },
    editPaket(editpaket) {
      this.showModal();
      this.updateSubmit = true;
      this.formPaket.id = editpaket.id;
      this.formPaket.namapaket = editpaket.namapaket;
      this.formPaket.hari = editpaket.hari;
      this.formPaket.harga = editpaket.harga;
      this.formPaket.currentImage = editpaket.currentImage;
    },
    updatePkt(form) {
      UpdateService.updatePaket(
        form.id,
        this.formPaket.currentImage,
        this.formPaket.namapaket,
        this.formPaket.hari,
        this.formPaket.harga
      )
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.formPaket.namapaket = "";
          this.formPaket.hari = "";
          this.formPaket.harga = "RP. 000 - 000 / pack";
          this.formPaket.currentImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.formPaket.currentImage = undefined;
        });
    },
    async update() {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/paket/tambahkota/" + this.form.id,
          {
            kotaid: this.form.kotaid,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
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
            "Bypass-Tunnel-Reminder": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.paket = paket.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    async loadkota() {
      try {
        const kota = await axios.get(this.$pathApi + "api/dashboard/kota", {
          headers: {
            "Bypass-Tunnel-Reminder": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
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
            "Bypass-Tunnel-Reminder": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.tempat = wisata.data;
      } catch (e) {
        console.log(e);
      }
    },
    async getWisata() {
      try {
        const twisata = await axios.get(
          this.$pathApi + "api/dashboard/paketwisata/3",
          {
            headers: {
              "Bypass-Tunnel-Reminder": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        this.twisata = twisata.data;
      } catch (e) {
        console.log(e);
      }
    },
    async addWisata() {
      try {
        await axios.post(
          this.$pathApi + "api/dashboard/paketwisata",
          this.formWisata,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        alert("Tempat wisata berhasil ditambahkan ke dalam paket");
        this.load();
      } catch (e) {
        console.log(e);
      }
    },
    del(delpaket) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        axios
          .delete(this.$pathApi + "api/dashboard/paket/" + delpaket.id, {
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
    delwisata(delwisata) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        axios
          .delete(this.$pathApi + "api/dashboard/paketwisata/" + delwisata.id, {
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
    async cariPaket() {
      try {
        if (this.cari == "") {
          this.load();
        } else {
          const cari = await axios.get(
            this.$pathApi + "api/dashboard/paket/search/" + this.cari,
            {
              headers: {
                "Bypass-Tunnel-Reminder": 1,
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );

          this.paket = cari.data;
        }
      } catch (e) {
        console.log(e);
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
