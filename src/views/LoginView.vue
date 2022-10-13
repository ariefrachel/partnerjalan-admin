<template>
  <div
    class="login d-flex justify-content-center align-items-center"
    style="margin-top: 84px"
  >
    <div class="card" style="width: 24rem; border-radius: 16px">
      <img
        src="../assets/image/header-bg.png"
        class="card-img-top"
        alt="login bg"
      />

      <div class="card-body cardLogin">
        <h3 class="card-title">Halaman Admin Partnerjalan</h3>
        <br />
        <h5 class="card-title" style="color: #55c9d3">Login</h5>
        <b-form-group label="Username" label-cols-lg="4">
          <b-form-input
            v-model="text"
            placeholder="Masukkan username"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password" label-cols-lg="4">
          <b-form-input
            v-model="text"
            type="password"
            placeholder="Masukkan password"
            required
          ></b-form-input>
        </b-form-group>
        <button class="btn btn-primary mt-4" style="float: right">
          <router-link to="/">Masuk</router-link>
        </button>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  name: "LoginView",
  components: {},
};
</script>
<style>
.card {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.07);
}
.cardLogin {
  padding: 42px;
}
.card-img-top {
  height: 10vw;
  object-fit: cover;
}
@media screen and (max-width: 576px) {
  .card-img-top {
    height: 35vw;
    object-fit: cover;
  }
  .login {
    padding-left: 5%;
    padding-right: 5%;
  }
}
</style>
  