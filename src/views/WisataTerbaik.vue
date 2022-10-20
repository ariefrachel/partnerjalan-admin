<template>
  <div class="wisataterbaik" id="content">
    <SidebarNav />
    <div class="Header d-flex justify-content-between">
      <h2>Wisata Terbaik</h2>

      <div>
        <b-button class="btn btn-primary" v-b-modal.modal-paketTerbaik
          >Tambah</b-button
        >
        <b-modal
          id="modal-paketTerbaik"
          ref="modal-paketTerbaik"
          hide-footer
          centered
          title="Tambah Paket Terbaik"
          ><form @submit.prevent="add">
            <div style="padding: 14px">
              <!-- <b-form-input v-model="kotaid" placeholder="Kota"></b-form-input> -->

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
            </div>
            <br />
            <div class="d-flex justify-content-end">
              <b-button class="btn mt-3 me-3" id="hide-btn" @click="hideModal"
                >Batal</b-button
              >
              <b-button class="btn btn-primary mt-3" type="submit"
                >Tambah ke Paket Terbaik</b-button
              >
            </div>
          </form>
        </b-modal>
      </div>
    </div>
    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
      style="margin-top: 21px"
    >
      <div class="col" :key="rekomen.id" v-for="rekomen in rekomen">
        <div class="card testimoniContent">
          <div class="testiImage">
            <img
              :src="pathImg + rekomen.kota.pathgambar"
              class="card-img-top"
              alt="..."
              height="100%"
            />
          </div>
          <div class="card-body">
            <div
              style="margin-top: 7px"
              class="d-flex align-items-center justify-content-between"
            >
              <h6 class="pe-2">Tempat Wisata {{ rekomen.kota.kota }}</h6>
              <button class="btn btn-delete" @click="del(rekomen)">
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
import SidebarNav from "@/components/SidebarNav.vue";
import http from "../http-common";
export default {
  name: "WisataTerbaik",
  components: {
    SidebarNav,
  },
  data() {
    return {
      form: {
        kotaid: [],
      },
      rekomen: "",
      kota: "",
      pathImg: this.$pathApi,
    };
  },
  mounted() {
    this.load();
    this.loadkota();
  },
  methods: {
    showModal() {
      this.$refs["modal-paketTerbaik"].show();
    },
    hideModal() {
      this.$refs["modal-paketTerbaik"].hide();
    },
    async load() {
      try {
        const rekomen = await http.get("api/dashboard/recomen", {
          headers: {
            "ngrok-skip-browser-warning": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.rekomen = rekomen.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    async loadkota() {
      try {
        const kota = await http.get("api/dashboard/kota", {
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
    async add() {
      try {
        await http.post("api/dashboard/recomen", this.form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        alert("Paket terbaik berhasil ditambahkan");
        this.hideModal();
        this.load();
      } catch (e) {
        console.log(e);
      }
    },
    del(terbaik) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http
          .delete("api/dashboard/recomen/" + terbaik.id, {
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
  