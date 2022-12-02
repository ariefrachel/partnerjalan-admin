<template>
  <div>
    <div
      class="riwayatHeader d-flex justify-content-between"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <h2>Daftar Admin</h2>
      <button class="btn btn-primary" v-b-modal.modal-admin>
        Tambah Admin
      </button>
    </div>
    <div class="table-responsive" style="margin-top: 21px">
      <table
        class="table table-light"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="50"
      >
        <thead class="table-dark">
          <tr>
            <th scope="col">Nama Lengkap</th>
            <th scope="col">Email</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admin" :key="admin.id">
            <td>{{ admin.fullname }}</td>
            <td>{{ admin.email }}</td>
            <td>
              <div class="d-flex">
                <button
                  class="btn btn btn-outline-danger ms-3"
                  @click="del(admin)"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal
      ref="modal-admin"
      id="modal-admin"
      centered
      hide-footer
      title="Tambah Admin"
    >
      <form @submit.prevent="add">
        <div class="d-block">
          <b-form-group label="Nama Lengkap" label-cols-lg="4">
            <b-form-input
              type="text"
              v-model="form.fullname"
              placeholder="Nama lengkap"
            ></b-form-input>
          </b-form-group>
          <br />
          <b-form-group label="Email" label-cols-lg="4">
            <b-form-input
              type="text"
              v-model="form.email"
              placeholder="Email"
            ></b-form-input>
          </b-form-group>
          <br />
          <b-form-group label="Password" label-cols-lg="4">
            <b-form-input
              type="password"
              v-model="form.password"
              placeholder="Password"
            ></b-form-input>
          </b-form-group>
        </div>
        <br />
        <b-button class="mt-3" id="hide-btn" @click="hideModal">Batal</b-button>
        <b-button class="mt-3 ms-3" type="submit" variant="primary" block
          >Tambah Admin</b-button
        >
      </form>
    </b-modal>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        fullname: "",
        email: "",
        password: "",
      },
      admin: [],
    };
  },
  methods: {
    showModal() {
      this.$refs["modal-admin"].show();
    },
    hideModal() {
      this.$refs["modal-admin"].hide();
    },
    async load() {
      try {
        const loadadmin = await axios.get(
          this.$pathApi + "api/dashboard/admin",
          {
            headers: {
              "Bypass-Tunnel-Reminder": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        this.admin = loadadmin.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    async add() {
      try {
        await axios.post(
          this.$pathApi + "api/dashboard/admin/register",
          this.form,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.hideModal();
        this.load();
        this.form.fullname = "";
        this.form.email = "";
        this.form.password = "";
      } catch (e) {
        console.log(e);
      }
    },
    del(delAdmin) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        axios
          .delete(this.$pathApi + "api/dashboard/admin/" + delAdmin.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.load();
            console.log(res);
          });
      }
    },
  },
  mounted() {
    this.load();
  },
};
</script>
  
  <style>
.table-dark {
  background-color: #133345;
}
</style>