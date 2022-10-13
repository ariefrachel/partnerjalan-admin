<template>
  <div class="tentangKami">
    <div class="about d-flex justify-content-between">
      <div>
        <h4>Tentang Kami</h4>
      </div>
      <b-button class="btn btn-primary" v-b-modal.modalEdit>Edit</b-button>
      <b-modal id="modalEdit" centered title="Edit Tentang Kami">
        <form>
          <div v-for="tentang in tentang" :key="tentang.id">
            <b-form-textarea
              id="textarea-rows"
              rows="4"
              v-model="tentang.id"
              style="display: none"
            ></b-form-textarea>
            <br />
            <b-form-textarea
              id="textarea-rows"
              rows="4"
              v-model="tentang.tentangkami"
              type="text"
            ></b-form-textarea>
          </div>
          <button
            class="btn btn-primary"
            @click="updateAbout(form)"
            type="button"
          >
            Update
          </button>
        </form>
      </b-modal>
    </div>

    <div class="inputabout">
      <div class="card">
        <div class="card-body" v-for="tentang in tentang" :key="tentang.id">
          {{ tentang.tentangkami }}
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
      tentang: "",
      pathApi: this.$pathApi,
    };
  },
  name: "TentangKami",
  mounted() {
    this.loadAbout();
  },
  methods: {
    async loadAbout() {
      try {
        const loadtentang = await axios.get(
          this.$pathApi + "api/user/about/tentangkami",
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
    editAbout(editTentang) {
      this.form.id = editTentang.id;
      this.form.tentangkami = editTentang.tentangkami;
    },
    async updateAbout(form) {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/infoperusahaan/tentangkami/" + form.id,
          {
            tentangkami: this.form.tentangkami,
          }
        );

        this.load();
        this.form.id = "";
        this.form.tentangkami = "";
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
body {
  background: #f5f6f8;
}
.profileCard {
  margin-top: 42px;
  padding: 2em;
  background: #fff;
  border-radius: 8px;
}
.inputabout {
  margin-top: 21px;
}
@media (max-width: 768px) {
  .tentangKami {
    margin-top: 84px;
  }
}
</style>