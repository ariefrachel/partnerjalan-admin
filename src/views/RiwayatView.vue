<template>
  <div class="riwayat" id="content">
    <SidebarNav />
    <div class="riwayatHeader d-flex justify-content-between">
      <h2>Riwayat Pemesanan</h2>
      <div class="row">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Cari riwayat..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button class="btn btn-primary" type="button" id="button-addon2">
            Cari
          </button>
        </div>
      </div>
    </div>

    <div style="margin-top: 42px">
      <TabelRiwayat />
    </div>
  </div>
</template>
  <script>
import SidebarNav from "@/components/SidebarNav.vue";
import TabelRiwayat from "@/components/TabelRiwayat.vue";
export default {
  name: "RiwayatView",
  components: {
    SidebarNav,
    TabelRiwayat,
  },
};
</script>
  