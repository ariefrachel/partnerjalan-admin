<template>
  <div class="kontak" id="content">
    <SidebarNav />
    <div style="margin-bottom: 42px">
      <KontakTour />
    </div>
    <hr style="opacity: 0.1" />
    <div style="margin-top: 42px">
      <MediaSosial />
    </div>
  </div>
</template>
  <script>
import SidebarNav from "@/components/SidebarNav.vue";
import KontakTour from "@/components/KontakTour.vue";
import MediaSosial from "@/components/MediaSosial.vue";
export default {
  name: "KontakView",
  components: {
    SidebarNav,
    KontakTour,
    MediaSosial,
  },
};
</script>
  