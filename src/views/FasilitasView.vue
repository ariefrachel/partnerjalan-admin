<template>
  <div class="fasilitas" id="content">
    <SidebarNav />
    <FasilitasTour />
    <div style="margin-top: 84px">
      <FasilitasPeserta />
    </div>
    <div style="margin-top: 84px">
      <FasilitasBonus />
    </div>
  </div>
</template>
  <script>
import SidebarNav from "@/components/SidebarNav.vue";
import FasilitasTour from "@/components/FasilitasTour.vue";
import FasilitasPeserta from "@/components/FasilitasPeserta.vue";
import FasilitasBonus from "@/components/FasilitasBonus.vue";
export default {
  name: "FasilitasView",
  components: {
    SidebarNav,
    FasilitasTour,
    FasilitasPeserta,
    FasilitasBonus,
  },
};
</script>
  