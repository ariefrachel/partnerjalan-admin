<template>
  <div class="testimoni" id="content">
    <SidebarNav />
    <div class="testimoniHeader d-flex justify-content-between">
      <h2>Testimoni</h2>
      <div>
        <b-button class="btn btn-primary" v-b-modal.modal-testi
          >Tambah</b-button
        >
        <b-modal
          id="modal-testi"
          ref="modal-testi"
          hide-footer
          centered
          title="Tambah Kontak"
        >
          <div style="padding: 14px">
            <div v-if="message" class="alert alert-secondary" role="alert">
              {{ message }}
            </div>
            <b-form-group label="Caption Testimoni" label-cols-lg="4">
              <b-form-input
                v-model="caption"
                placeholder="Caption"
              ></b-form-input>
            </b-form-group>
            <br />
            <b-form-group
              label="Upload gambar"
              label-for="form-image"
              label-cols-lg="4"
            >
              <b-input-group>
                <input
                  type="file"
                  accept="image/*"
                  ref="file"
                  @change="selectImage"
                />
              </b-input-group>
            </b-form-group>
            <div v-if="previewImage">
              <div>
                <img
                  class="preview my-3"
                  :src="previewImage"
                  alt=""
                  style="width: 50%"
                />
              </div>
            </div>
            <br />
            <div class="d-flex justify-content-end">
              <b-button class="btn mt-3 me-3" id="hide-btn" @click="hideModal"
                >Batal</b-button
              >
              <b-button
                class="btn btn-primary mt-3"
                :disabled="!currentImage"
                @click="upload"
                >Tambah Data</b-button
              >
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
      style="margin-top: 21px"
    >
      <div class="col" v-for="testi in testimoni" :key="testi.id">
        <div class="card testimoniContent">
          <div class="testiImage">
            <img
              :src="pathTesti + testi.path"
              class="card-img-top"
              alt="testimoni"
              style="height: 100%"
            />
          </div>
          <div class="card-body">
            <p>{{ testi.caption }}</p>
            <div style="float: right; margin-top: 7px">
              <button class="btn btn-edit" style="margin-right: 14px">
                Edit
              </button>
              <button class="btn btn-delete" @click="del(testi)">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UploadService from "../services/UploadFilesService";
import http from "../http-common";
import SidebarNav from "@/components/SidebarNav.vue";
export default {
  name: "TestimoniView",
  components: {
    SidebarNav,
  },
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,

      message: "",
      caption: "",
      testimoni: [],
      pathTesti: this.$pathApi,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-testi"].show();
    },
    hideModal() {
      this.$refs["modal-testi"].hide();
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadTestimoni(this.currentImage, this.caption)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.caption = "";
          this.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.currentImage = undefined;
        });
    },
    async load() {
      try {
        const testimoni = await http.get("api/dashboard/testimoni", {
          headers: {
            "ngrok-skip-browser-warning": 1,
          },
        });

        this.testimoni = testimoni.data;
      } catch (e) {
        console.log(e);
      }
    },
    del(testi) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http.delete("api/dashboard/testimoni/" + testi.id).then((res) => {
          this.load();
          console.log(res);
        });
      }
    },
  },
};
</script>
