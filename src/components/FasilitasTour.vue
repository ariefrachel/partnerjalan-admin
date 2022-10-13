<template>
  <div class="visiMisi">
    <div class="about d-flex justify-content-between">
      <h4>Fasilitas Tour</h4>
      <div class="d-flex">
        <b-button id="show-btn" @click="showModal" variant="primary"
          >Tambah Data</b-button
        >
      </div>
    </div>
    <div class="add" style="margin-top: 21px">
      <b-modal
        ref="modal-tour"
        centered
        hide-footer
        title="Tambah Visi dan Misi"
      >
        <form @submit.prevent="add">
          <div class="d-block text-center">
            <input
              class="form-control"
              type="text"
              v-model="form.fasilitastour"
            />
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
      <div class="row" :key="tour.id" v-for="tour in tour">
        <div class="col-12">
          <div class="card mt-1">
            <div class="card-body">
              <div class="row">
                <div class="col-md-10 col-9">
                  {{ tour.fasilitastour }}
                </div>
                <div class="col-md-2 col-3">
                  <button class="btn" @click="edit(tour)">
                    <i class="fas fa-pen-to-square" style="color: #f2a73b"></i>
                  </button>
                  <button class="btn" @click="del(tour)">
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        fasilitastour: "",
      },
      tour: "",
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-tour"].show();
    },
    hideModal() {
      this.$refs["modal-tour"].hide();
    },
    async load() {
      try {
        const loadtour = await axios.get(
          this.$pathApi + "api/user/fasilitasuser/tour",
          {
            headers: {
              "ngrok-skip-browser-warning": 1,
            },
          }
        );

        this.tour = loadtour.data;
      } catch (e) {
        console.log(e);
      }
    },
    async add() {
      try {
        await axios.post(
          this.$pathApi + "api/dashboard/fasilitas/fasilitastour",
          this.form
        );
        this.hideModal();
        this.load();
        this.form.fasilitastour = "";
      } catch (e) {
        console.log(e);
      }
    },
    edit(editTour) {
      this.showModal();
      this.updateSubmit = true;
      this.form.id = editTour.id;
      this.form.fasilitastour = editTour.fasilitastour;
    },
    async update(form) {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/fasilitas/fasilitastour/" + form.id,
          {
            fasilitastour: this.form.fasilitastour,
          }
        );
        this.hideModal();
        this.load();
        this.form.id = "";
        this.form.fasilitastour = "";
        this.updateSubmit = false;
      } catch (e) {
        console.log(e);
      }
    },
    async del(delTour) {
      try {
        await axios.delete(
          this.$pathApi + "api/dashboard/fasilitas/fasilitastour/" + delTour.id
        );
        this.load();
        let index = this.tour.indexOf(delTour.fasilitastour);
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