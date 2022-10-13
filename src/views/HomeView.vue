<template>
  <div class="home" id="content">
    <SidebarNav />
    <h1>This is an home page</h1>
  </div>
</template>
<script>
import SidebarNav from "@/components/SidebarNav.vue";
export default {
  name: "HomeView",
  components: {
    SidebarNav,
  },
};
</script>
