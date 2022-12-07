<template>
  <div class="fasilitas" id="content">
    <SidebarNav />
    <div class="visiMisi">
      <div
        class="about d-flex justify-content-between"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <h4>Hotel</h4>
        <div class="d-flex">
          <b-button
            id="show-btn"
            @click="showModal"
            variant="primary"
            class="me-3"
            >Tambah Hotel</b-button
          >
          <b-button id="show-btn" @click="showModal2" variant="secondary"
            >Masukkan Hotel ke Paket</b-button
          >
        </div>
      </div>
      <div class="add" style="margin-top: 21px">
        <b-modal
          ref="modal-tour"
          centered
          hide-footer
          title="Tambah Tempat Wisata"
        >
          <form @submit.prevent="add">
            <div class="d-block">
              <b-form-group label="Nama Kota" label-cols-lg="4">
                {{ form.kotaid }}
                <b-form-select
                  class="form-select"
                  v-model="form.kotaid"
                  :options="options"
                >
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
              </b-form-group>
              <br />
              <b-form-group label="Nama Hotel" label-cols-lg="4">
                <b-form-input
                  v-model="form.nama"
                  placeholder="Hotel"
                ></b-form-input>
              </b-form-group>
            </div>
            <br />
            <b-button class="mt-3" id="hide-btn" @click="hideModal"
              >Batal</b-button
            >
            <b-button
              class="mt-3 ms-3"
              type="submit"
              variant="primary"
              block
              v-show="!updateSubmit"
              >Tambah</b-button
            >
            <b-button
              class="mt-3"
              variant="warning"
              block
              type="button"
              @click="update(form)"
              v-show="updateSubmit"
              >Update</b-button
            >
          </form>
        </b-modal>
      </div>
      <b-modal
        ref="modal-relasi"
        centered
        hide-footer
        title="Masukkan Hotel ke Paket"
      >
        <form @submit.prevent="addRelasi">
          <div class="d-block">
            <b-form-group label="Nama Paket" label-cols-lg="4">
              <b-form-select
                class="form-select"
                v-model="formRelasi.paketid"
                :options="options"
              >
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
            <b-form-group label="Nama Hotel" label-cols-lg="4">
              <b-form-select
                class="form-select"
                v-model="formRelasi.hotelid"
                :options="options"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>
                    Pilih Hotel
                  </b-form-select-option>
                </template>
                <b-form-select-option
                  :key="pilihHotel.id"
                  v-for="pilihHotel in hotel"
                  :value="pilihHotel.id"
                  >{{ pilihHotel.nama }}</b-form-select-option
                >
              </b-form-select>
            </b-form-group>
          </div>
          <br />
          <b-button class="mt-3" id="hide-btn" @click="hideModal"
            >Batal</b-button
          >
          <b-button
            class="mt-3 ms-3"
            type="submit"
            variant="primary"
            block
            v-show="!updateSubmit"
            >Tambah</b-button
          >
          <b-button
            class="mt-3"
            variant="warning"
            block
            type="button"
            @click="update(form)"
            v-show="updateSubmit"
            >Update</b-button
          >
        </form>
      </b-modal>
      <div class="inputabout">
        <div class="row" :key="hotel.id" v-for="hotel in hotel">
          <div class="col-12">
            <div
              class="card mt-1"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="50"
            >
              <div class="card-body">
                <div class="row">
                  <div class="col-md-10 col-9">
                    {{ hotel.nama }}
                    <span
                      :key="hotelpaket.id"
                      v-for="hotelpaket in hotel.hotelrelasi"
                      style="color: #55c9d3"
                    >
                      ({{ hotelpaket.paket.namapaket }})
                    </span>
                  </div>
                  <div class="col-md-2 col-3">
                    <button class="btn" @click="edit(hotel)">
                      <i
                        class="fas fa-pen-to-square"
                        style="color: #f2a73b"
                      ></i>
                    </button>
                    <button class="btn" @click="del(hotel)">
                      <i class="fas fa-trash" style="color: #dc3545"></i>
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
import axios from "axios";
import SidebarNav from "@/components/SidebarNav.vue";
export default {
  data() {
    return {
      form: {
        kotaid: [],
        nama: "",
      },
      formRelasi: {
        paketid: [],
        hotelid: [],
      },
      hotel: "",
      kota: "",
      paket: [],
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
    this.loadkota();
    this.loadPaket();
  },
  methods: {
    showModal() {
      this.$refs["modal-tour"].show();
    },
    hideModal() {
      this.$refs["modal-tour"].hide();
    },
    showModal2() {
      this.$refs["modal-relasi"].show();
    },
    hideModal2() {
      this.$refs["modal-relasi"].hide();
    },
    async load() {
      try {
        const loadhotel = await axios.get(
          this.$pathApi + "api/dashboard/hotel",
          {
            headers: {
              "ngrok-skip-browser-warning": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.hotel = loadhotel.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    async loadkota() {
      try {
        const kota = await axios.get(this.$pathApi + "api/dashboard/kota", {
          headers: {
            "ngrok-skip-browser-warning": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.kota = kota.data;
      } catch (e) {
        console.log(e);
      }
    },
    async loadPaket() {
      try {
        const paket = await axios.get(this.$pathApi + "api/dashboard/paket", {
          headers: {
            "ngrok-skip-browser-warning": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.paket = paket.data;
      } catch (e) {
        console.log(e);
      }
    },
    async add() {
      try {
        await axios.post(this.$pathApi + "api/dashboard/hotel", this.form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.hideModal();
        this.load();
        this.form.nama = "";
      } catch (e) {
        console.log(e);
      }
    },
    async addRelasi() {
      try {
        await axios.post(
          this.$pathApi + "api/dashboard/hotel/relasi",
          this.formRelasi,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.hideModal2();
        this.load();
        this.formRelasi.paketid = [];
        this.formRelasi.hotelid = [];
      } catch (e) {
        console.log(e);
      }
    },
    edit(editHotel) {
      this.showModal();
      this.updateSubmit = true;
      this.form.kotaid = editHotel.kotaid;
      this.form.nama = editHotel.nama;
    },
    async update(form) {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/hotel/" + form.id,
          {
            nama: this.form.nama,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.hideModal();
        this.load();
        this.form.kotaid = "";
        this.form.nama = "";
        this.updateSubmit = false;
      } catch (e) {
        console.log(e);
      }
    },
    del(hotel) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        axios
          .delete(this.$pathApi + "api/dashboard/hotel/" + hotel.id, {
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
  components: { SidebarNav },
};
</script>

<style>
</style>