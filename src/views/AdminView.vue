<template>
  <div class="riwayat" id="content">
    <SidebarNav />

    <div style="margin-top: 42px">
      <TabelAdmin />
    </div>
  </div>
</template>
  <script>
import SidebarNav from "@/components/SidebarNav.vue";
import TabelAdmin from "@/components/TabelAdmin.vue";

export default {
  name: "AdminView",
  components: {
    SidebarNav,
    TabelAdmin,
  },
};
</script>
  