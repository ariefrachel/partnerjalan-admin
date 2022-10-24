<template>
  <div class="riwayat" id="content">
    <SidebarNav />
    <div
      class="riwayatHeader d-flex justify-content-between"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <h2>Riwayat Pemesanan</h2>
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
  