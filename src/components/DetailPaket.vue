<template>
  <div>
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
              <button class="col-6 btn btn-outline-danger">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      paket: [],
      pathContact: this.$pathApi,
    };
  },
  mounted() {
    this.load();
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    async load() {
      try {
        const paket = await axios.get(
          this.$pathApi + "api/dashboard/paket/" + this.$route.params.id,
          {
            headers: {
              "Bypass-Tunnel-Reminder": 1,
            },
          }
        );

        this.paket = paket.data;
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