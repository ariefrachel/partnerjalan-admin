<template>
  <div class="profil" id="content">
    <SidebarNav />
    <div style="margin-bottom: 42px">
      <TentangKami />
    </div>
    <hr />
    <div style="margin-top: 42px">
      <VisiMisi />
    </div>
  </div>
</template>
<script>
import SidebarNav from "@/components/SidebarNav.vue";
import TentangKami from "@/components/TentangKami.vue";
import VisiMisi from "../components/VisiMisi.vue";
export default {
  name: "AboutView",
  components: {
    SidebarNav,
    TentangKami,
    VisiMisi,
  },
};
</script>
