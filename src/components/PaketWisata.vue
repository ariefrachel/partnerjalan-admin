<template>
  <div>
    <div class="partnerHeader d-flex justify-content-between">
      <h2>Daftar Paket Wisata</h2>
      <div class="d-flex">
        <b-button class="btn btn-secondary me-3" v-b-modal.modal-wisata
          >Tambah Wisata</b-button
        >
        <b-button class="btn btn-primary" v-b-modal.modal-paket
          >Tambah Paket</b-button
        >
      </div>
    </div>
    <div
      class="daftarPaket mt-3"
      v-for="paketwisata in paket"
      :key="paketwisata.id"
    >
      <div class="row">
        <div class="col-lg-3 col-12">
          <div class="paketImg">
            <img :src="pathContact + paketwisata.pathgambar" alt="paket" />
          </div>
        </div>
        <div class="col-lg-9 col-12 mt-lg-0 mt-3">
          <h5>Paket Wisata {{ paketwisata.namapaket }}</h5>
          <span style="color: #55c9d3">{{ paketwisata.hari }}</span>
          <div class="mt-3 wisataList">
            <span class="fw-bolder">Tempat Wisata</span>
            <div class="row">
              <div class="col-lg-8">
                <ul class="mt-1 row" style="margin-left: -0.75em">
                  <li
                    class="col-lg-6 col-12"
                    v-for="twisata in paketwisata.paketwisata"
                    :key="twisata.id"
                  >
                    {{ twisata.wisata }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="harga pe-4" style="float: right">
            <h5 style="color: #55c9d3">{{ paketwisata.harga }}</h5>
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

      message: "",
      paket: [],
      kota: "",
      tempat: "",
      pathContact: this.$pathApi,
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      try {
        const paket = await axios.get(this.$pathApi + "api/dashboard/paket", {
          headers: {
            "Bypass-Tunnel-Reminder": 1,
          },
        });

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
