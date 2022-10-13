<template>
  <div class="riwayat" id="content">
    <SidebarNav />
    <div class="riwayatHeader d-flex justify-content-between">
      <h2>Daftar Admin</h2>
      <button class="btn btn-primary">Tambah</button>
    </div>

    <div style="margin-top: 42px">
      <TabelAdmin />
    </div>
    <nav aria-label="Page navigation example" style="margin-top: 42px">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
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
  