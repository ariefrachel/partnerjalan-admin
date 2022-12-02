<template>
  <div class="home" id="content">
    <SidebarNav />
    <h2 data-aos="fade-down" data-aos-duration="800">
      Selamat Datang di Halaman Admin PartnerJalan
    </h2>
    <div class="row gy-3" style="margin-top: 35px">
      <div class="col-lg-3 col-md-6">
        <div class="card" data-aos="fade-up" data-aos-duration="800">
          <div class="card-body">
            <h6 class="card-title">Total Kota</h6>
            <h3 class="card-text">
              {{ kota.length }}
            </h3>
            <button class="btn btn-sm btn-primary mt-2">
              <router-link to="/kota">Lihat kota</router-link>
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div
          class="card"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="50"
        >
          <div class="card-body">
            <h6 class="card-title">Total Paket Wisata</h6>
            <h3 class="card-text">
              {{ paket.length }}
            </h3>
            <button class="btn btn-sm btn-primary mt-2">
              <router-link to="/paket">Lihat Paket</router-link>
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div
          class="card"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <div class="card-body">
            <h6 class="card-title">Total Testimoni</h6>
            <h3 class="card-text">
              {{ testimoni.length }}
            </h3>
            <button class="btn btn-sm btn-primary mt-2">
              <router-link to="/testimoni">Lihat Testimoni</router-link>
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div
          class="card"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="150"
        >
          <div class="card-body">
            <h6 class="card-title">Total Pemesanan</h6>
            <h3 class="card-text">
              {{ riwayat.length }}
            </h3>
            <button class="btn btn-sm btn-primary mt-2">
              <router-link to="/riwayat">Lihat Pemesanan</router-link>
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-12 d-none d-lg-block">
        <div
          class="card mt-2"
          style="position: relative; height: 385px; overflow: hidden"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <img
            src="../assets/image/home.png"
            class="card-img-top"
            style="position: absolute"
            alt="home"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SidebarNav from "@/components/SidebarNav.vue";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  name: "HomeView",
  components: {
    SidebarNav,
  },
  data() {
    return {
      kota: [],
      paket: [],
      testimoni: [],
      riwayat: [],
      pathImg: this.$pathApi,
    };
  },
  mounted() {
    AOS.init();
    this.load();
    this.loadPaket();
    this.loadTesti();
    this.loadPesan();
  },
  methods: {
    async load() {
      try {
        const kota = await axios.get(this.$pathApi + "api/dashboard/kota", {
          headers: {
            "Bypass-Tunnel-Reminder": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.kota = kota.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    async loadPaket() {
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
    async loadTesti() {
      try {
        const testimoni = await axios.get(
          this.$pathApi + "api/dashboard/testimoni",
          {
            headers: {
              "Bypass-Tunnel-Reminder": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        this.testimoni = testimoni.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    async loadPesan() {
      try {
        const riwayat = await axios.get(
          this.$pathApi + "api/dashboard/riwayat",
          {
            headers: {
              "Bypass-Tunnel-Reminder": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        this.riwayat = riwayat.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
  },
};
</script>