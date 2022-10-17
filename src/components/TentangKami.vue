<template>
  <div class="visiMisi">
    <div class="about d-flex justify-content-between">
      <h4>Tentang Kami</h4>
      <div class="d-flex">
        <b-button id="show-btn" @click="showModal" variant="primary"
          >Tambah Paragraf</b-button
        >
      </div>
    </div>
    <div class="add" style="margin-top: 21px">
      <b-modal
        ref="modal-tentang"
        centered
        hide-footer
        title="Tambah Paragraf Tentang Kami"
      >
        <form @submit.prevent="add">
          <div class="d-block text-center">
            <input class="form-control" type="hidden" v-model="form.id" />
            <textarea
              class="form-control"
              id="floatingTextarea2"
              style="height: 400px"
              v-model="form.tentangkami"
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
    <div class="inputabout">
      <div>
        <div class="row" v-for="tentang in tentang.tentang" :key="tentang.id">
          <div class="col-12">
            <div class="card mt-2">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-10 col-9">
                    <div>
                      {{ tentang.tentangkami }}
                    </div>
                  </div>
                  <div class="col-md-2 col-3">
                    <button class="btn" @click="edit(tentang)">
                      <i
                        class="fas fa-pen-to-square"
                        style="color: #f2a73b"
                      ></i>
                    </button>
                    <button class="btn" @click="del(tentang)">
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
        tentangkami: "",
      },
      tentang: [],
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-tentang"].show();
    },
    hideModal() {
      this.$refs["modal-tentang"].hide();
    },
    async load() {
      try {
        const loadtentang = await axios.get(
          this.$pathApi + "api/dashboard/infoperusahaan",
          {
            headers: {
              "ngrok-skip-browser-warning": 1,
            },
          }
        );

        this.tentang = loadtentang.data;
      } catch (e) {
        console.log(e);
      }
    },
    async add() {
      try {
        await axios.post(
          this.$pathApi + "api/dashboard/infoperusahaan/tentangkami",
          this.form
        );
        this.hideModal();
        this.load();
        this.form.tentangkami = "";
      } catch (e) {
        console.log(e);
      }
    },
    edit(edittentang) {
      this.showModal();
      this.updateSubmit = true;
      this.form.id = edittentang.id;
      this.form.tentangkami = edittentang.tentangkami;
    },
    async update(form) {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/infoperusahaan/tentangkami/" + form.id,
          {
            tentangkami: this.form.tentangkami,
          }
        );

        this.hideModal();
        this.load();
        this.form.id = "";
        this.form.tentangkami = "";
        this.updateSubmit = false;
      } catch (e) {
        console.log(e);
      }
    },
    async del(deltentang) {
      try {
        await axios.delete(
          this.$pathApi +
            "api/dashboard/infoperusahaan/tentangkami/" +
            deltentang.id
        );
        this.load();
        let index = this.visi.indexOf(deltentang.tentangkami);
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