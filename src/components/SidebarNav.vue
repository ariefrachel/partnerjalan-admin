<template>
  <div class="wrapperSidebar">
    <nav id="sidebar">
      <div class="sidebar-header">
        <div
          class="d-flex align-items-center"
          style="margin-top: 0.5em; margin-left: 14px"
        >
          <img style="width: 25%" src="@/assets/image/logo.png" alt="Logo" />
          <h6>PartnerJalan</h6>
        </div>
      </div>

      <ul class="sidebarList list-unstyled components">
        <li class="d-flex align-items-center">
          <i class="fas fa-home"></i>
          <router-link to="/">Home</router-link>
        </li>
        <li class="d-flex align-items-center">
          <i class="fas fa-user"></i>
          <router-link to="/about">Profil</router-link>
        </li>
        <li>
          <div class="d-flex align-items-center">
            <i class="fas fa-map"></i>
            <a
              href="#pageSubmenu"
              data-bs-toggle="collapse"
              aria-expanded="false"
              >Daftar Wisata</a
            >
          </div>
          <ul class="collapse list-unstyled" id="pageSubmenu">
            <li>
              <router-link to="/kota">Kota</router-link>
            </li>
            <li>
              <router-link to="/terbaik">Wisata Terbaik</router-link>
            </li>
            <li>
              <router-link to="/paket">Daftar Paket</router-link>
            </li>
            <li>
              <router-link to="/hotel">Hotel</router-link>
            </li>
            <li>
              <router-link to="/tempat">Tempat Wisata</router-link>
            </li>
          </ul>
        </li>
        <li class="d-flex align-items-center">
          <i class="fas fa-history"></i>
          <router-link to="/riwayat">Riwayat Pemesanan</router-link>
        </li>
        <li class="d-flex align-items-center">
          <i class="fas fa-list"></i>
          <router-link to="/fasilitas">Fasilitas</router-link>
        </li>
        <li class="d-flex align-items-center">
          <i class="fas fa-handshake-simple"></i>
          <router-link to="/partnership">Partnership</router-link>
        </li>
        <li class="d-flex align-items-center">
          <i class="fas fa-users"></i>
          <router-link to="/admin">Daftar Admin</router-link>
        </li>
        <li class="d-flex align-items-center">
          <i class="fas fa-comment"></i>
          <router-link to="/testimoni">Testimoni</router-link>
        </li>
        <li class="d-flex align-items-center">
          <i class="fas fa-phone"></i>
          <router-link to="/kontak">Kontak</router-link>
        </li>
        <li class="d-flex align-items-center mt-5">
          <i class="fas fa-right-from-bracket"></i>
          <router-link to="/login">Logout</router-link>
        </li>
      </ul>
    </nav>
    <div id="sidebar-mb" class="mb-4">
      <b-button v-b-toggle.sidebar-admin
        ><i class="fa-solid fa-bars"></i
      ></b-button>
      <b-sidebar id="sidebar-admin" title="Sidebar" shadow>
        <nav>
          <div class="sidebar-header">
            <div
              class="d-flex align-items-center"
              style="margin-top: 0.5em; margin-left: 14px"
            >
              <img
                style="width: 25%"
                src="@/assets/image/logo.png"
                alt="Logo"
              />
              <h6>PartnerJalan</h6>
            </div>
          </div>

          <ul class="sidebarList list-unstyled components">
            <li class="d-flex align-items-center">
              <i class="fas fa-home"></i>
              <router-link to="/">Home</router-link>
            </li>
            <li class="d-flex align-items-center">
              <i class="fas fa-user"></i>
              <router-link to="/about">Profil</router-link>
            </li>
            <li>
              <div class="d-flex align-items-center">
                <i class="fas fa-map"></i>
                <a
                  href="#pageSubmenu"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  >Daftar Wisata</a
                >
              </div>
              <ul class="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <router-link to="/kota">Kota</router-link>
                </li>
                <li>
                  <router-link to="/terbaik">Wisata Terbaik</router-link>
                </li>
                <li>
                  <router-link to="/paket">Daftar Paket</router-link>
                </li>
                <li>
                  <router-link to="/hotel">Hotel</router-link>
                </li>
                <li>
                  <router-link to="/tempat">Tempat Wisata</router-link>
                </li>
              </ul>
            </li>
            <li class="d-flex align-items-center">
              <i class="fas fa-history"></i>
              <router-link to="/riwayat">Riwayat Pemesanan</router-link>
            </li>
            <li class="d-flex align-items-center">
              <i class="fas fa-list"></i>
              <router-link to="/fasilitas">Fasilitas</router-link>
            </li>
            <li class="d-flex align-items-center">
              <i class="fas fa-handshake-simple"></i>
              <router-link to="/partnership">Partnership</router-link>
            </li>
            <li class="d-flex align-items-center">
              <i class="fas fa-users"></i>
              <router-link to="/admin">Daftar Admin</router-link>
            </li>
            <li class="d-flex align-items-center">
              <i class="fas fa-comment"></i>
              <router-link to="/testimoni">Testimoni</router-link>
            </li>
            <li class="d-flex align-items-center">
              <i class="fas fa-phone"></i>
              <router-link to="/kontak">Kontak</router-link>
            </li>
            <li class="d-flex align-items-center mt-5" @click="logout">
              <i class="fas fa-right-from-bracket"></i>
              Logout
            </li>
          </ul>
        </nav>
      </b-sidebar>
    </div>
    <!-- <div id="content">
      <nav class="navbar navbar-expand-lg navbar-light bg-light togglenav">
        <div class="container-fluid">
          <button type="button" id="sidebarCollapse" class="btn btn-info">
            <i class="fas fa-align-left"></i>
            <span>Toggle Sidebar</span>
          </button>
        </div>
      </nav>
    </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        window.localStorage.clear();
        await this.$router.push("/login");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#sidebar-mb {
  display: none;
}
@media only screen and (max-width: 800px) {
  #sidebar {
    display: none;
  }
  #sidebar-mb {
    display: block;
  }
}
</style>