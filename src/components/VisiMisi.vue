<template>
  <div class="visiMisi">
    <div
      class="about d-flex justify-content-between"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="50"
    >
      <h4>Visi dan misi</h4>
      <div class="d-flex">
        <b-button id="show-btn" @click="showModal" variant="primary"
          >Tambah Data</b-button
        >
      </div>
    </div>
    <div class="add" style="margin-top: 21px">
      <b-modal
        ref="modal-visi"
        centered
        hide-footer
        title="Tambah Visi dan Misi"
      >
        <form @submit.prevent="add">
          <div class="d-block text-center">
            <input class="form-control" type="hidden" v-model="form.id" />
            <textarea
              class="form-control"
              id="floatingTextarea2"
              style="height: 200px"
              v-model="form.visimisi"
            ></textarea>
          </div>
          <b-button class="mt-3" id="hide-btn" @click="hideModal"
            >Batal</b-button
          >
          <b-button
            class="mt-3 ms-3"
            type="submit"
            variant="primary"
            block
            v-show="!updateSubmit"
            >Tambah</b-button
          >
          <b-button
            class="mt-3"
            variant="warning"
            block
            type="button"
            @click="update(form)"
            v-show="updateSubmit"
            >Update</b-button
          >
        </form>
      </b-modal>
    </div>
    <div
      class="inputabout"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="100"
    >
      <div>
        <div class="row" v-for="vis in visi.visimisi" :key="vis.id">
          <div class="col-12">
            <div class="card mt-2">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-10 col-9">
                    <div>
                      {{ vis.visimisi }}
                    </div>
                  </div>
                  <div class="col-md-2 col-3">
                    <button class="btn" @click="edit(vis)">
                      <i
                        class="fas fa-pen-to-square"
                        style="color: #f2a73b"
                      ></i>
                    </button>
                    <button class="btn" @click="del(vis)">
                      <i class="fas fa-trash" style="color: #dc3545"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        id: "",
        visimisi: "",
      },
      visi: [],
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-visi"].show();
    },
    hideModal() {
      this.$refs["modal-visi"].hide();
    },
    async load() {
      try {
        const loadvisi = await axios.get(
          this.$pathApi + "api/dashboard/infoperusahaan",
          {
            headers: {
              "ngrok-skip-browser-warning": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        this.visi = loadvisi.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    async add() {
      try {
        await axios.post(
          this.$pathApi + "api/dashboard/infoperusahaan/visimisi",
          this.form,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.hideModal();
        this.load();
        this.form.visimisi = "";
      } catch (e) {
        console.log(e);
      }
    },
    edit(editvisi) {
      this.showModal();
      this.updateSubmit = true;
      this.form.id = editvisi.id;
      this.form.visimisi = editvisi.visimisi;
    },
    async update(form) {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/infoperusahaan/visimisi/" + form.id,
          {
            visimisi: this.form.visimisi,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        this.hideModal();
        this.load();
        this.form.id = "";
        this.form.visimisi = "";
        this.updateSubmit = false;
      } catch (e) {
        console.log(e);
      }
    },
    async del(delvisi) {
      try {
        await axios.delete(
          this.$pathApi + "api/dashboard/infoperusahaan/visimisi/" + delvisi.id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.load();
        let index = this.visi.indexOf(delvisi.visimisi);
        this.visi.splice(index, 1);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>