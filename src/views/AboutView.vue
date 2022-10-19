<template>
  <div class="profil" id="content">
    <SidebarNav />
    <div style="margin-bottom: 42px">
      <TentangKami />
    </div>
    <hr />
    <div style="margin: 42px 0">
      <VisiMisi />
    </div>
    <hr />
    <div style="margin-top: 42px">
      <AboutImage />
    </div>
  </div>
</template>
<script>
import SidebarNav from "@/components/SidebarNav.vue";
import TentangKami from "@/components/TentangKami.vue";
import VisiMisi from "../components/VisiMisi.vue";
import AboutImage from "@/components/AboutImage.vue";
export default {
  name: "AboutView",
  components: {
    SidebarNav,
    TentangKami,
    VisiMisi,
    AboutImage,
  },
};
</script>
