<template>
  <div class="fasilitas" id="content">
    <SidebarNav />
    <div class="visiMisi">
      <div
        class="about d-flex justify-content-between"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <h4>Tempat Wisata</h4>
        <div class="d-flex">
          <b-button id="show-btn" @click="showModal" variant="primary"
            >Tambah Data</b-button
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
              <b-form-group label="Nama Tempat Wisata" label-cols-lg="4">
                <b-form-input
                  v-model="form.tempatwisata"
                  placeholder="Tempat wisata"
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

      <div class="inputabout">
        <div class="row" :key="wisata.id" v-for="wisata in wisata">
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
                    {{ wisata.tempatwisata }}
                    <span style="color: #55c9d3"> ({{ wisata.kotaid }}) </span>
                  </div>
                  <div class="col-md-2 col-3">
                    <button class="btn" @click="edit(wisata)">
                      <i
                        class="fas fa-pen-to-square"
                        style="color: #f2a73b"
                      ></i>
                    </button>
                    <button class="btn" @click="del(wisata)">
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
        tempatwisata: "",
      },
      wisata: "",
      kota: "",
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
    this.loadkota();
  },
  methods: {
    showModal() {
      this.$refs["modal-tour"].show();
    },
    hideModal() {
      this.$refs["modal-tour"].hide();
    },
    async load() {
      try {
        const loadwisata = await axios.get(
          this.$pathApi + "api/dashboard/wisata",
          {
            headers: {
              "Bypass-Tunnel-Reminder": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.wisata = loadwisata.data;
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
    async add() {
      try {
        await axios.post(this.$pathApi + "api/dashboard/wisata", this.form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.hideModal();
        this.load();
        this.form.tempatwisata = "";
      } catch (e) {
        console.log(e);
      }
    },
    edit(editTempat) {
      this.showModal();
      this.updateSubmit = true;
      this.form.kotaid = editTempat.kotaid;
      this.form.tempatwisata = editTempat.tempatwisata;
    },
    async update(form) {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/wisata/" + form.id,
          {
            tempatwisata: this.form.tempatwisata,
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
        this.form.tempatwisata = "";
        this.updateSubmit = false;
      } catch (e) {
        console.log(e);
      }
    },
    del(wisata) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        axios
          .delete(this.$pathApi + "api/dashboard/wisata/" + wisata.id, {
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