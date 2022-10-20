<template>
  <div class="wisataPaket" id="content">
    <SidebarNav />
    <div style="margin-top: 21px">
      <DaftarPaket />
    </div>
  </div>
</template>
<script>
import SidebarNav from "@/components/SidebarNav.vue";
import DaftarPaket from "@/components/DaftarPaket.vue";
export default {
  name: "WisataPaket",
  components: {
    SidebarNav,
    DaftarPaket,
  },
};
</script>
    