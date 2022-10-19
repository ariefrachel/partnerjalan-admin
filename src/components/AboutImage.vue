<template>
  <div class="visiMisi">
    <div class="about d-flex justify-content-between">
      <h4>Foto</h4>
      <div class="d-flex">
        <b-button id="show-btn" @click="showModal" variant="primary"
          >Tambah Foto</b-button
        >
      </div>
    </div>
    <b-modal
      id="modal-foto"
      ref="modal-foto"
      hide-footer
      centered
      title="Tambah Foto"
    >
      <div style="padding: 14px">
        <div v-if="message" class="alert alert-secondary" role="alert">
          {{ message }}
        </div>
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
        <div v-if="form.previewImage">
          <div>
            <img
              class="preview my-3"
              :src="form.previewImage"
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
            :disabled="!form.currentImage"
            @click="upload"
            >Tambah Foto</b-button
          >
        </div>
      </div>
    </b-modal>
    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mt-1"
    >
      <div class="col" v-for="foto in foto.foto" :key="foto.id">
        <div class="card testimoniContent">
          <div class="testiImage">
            <img
              :src="pathFoto + foto.path"
              class="card-img-top"
              alt="testimoni"
              style="height: 100%"
            />
          </div>
          <div class="card-body">
            <div style="float: right; margin-top: 7px">
              <button class="btn btn-delete" @click="del(foto)">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import UploadService from "../services/UploadFilesService";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        currentImage: undefined,
        previewImage: undefined,
      },
      message: "",
      foto: [],
      pathFoto: this.$pathApi,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-foto"].show();
    },
    hideModal() {
      this.$refs["modal-foto"].hide();
    },
    async load() {
      try {
        const loadfoto = await axios.get(
          this.$pathApi + "api/dashboard/infoperusahaan",
          {
            headers: {
              "ngrok-skip-browser-warning": 1,
            },
          }
        );

        this.foto = loadfoto.data;
      } catch (e) {
        console.log(e);
      }
    },
    selectImage() {
      this.form.currentImage = this.$refs.file.files.item(0);
      this.form.previewImage = URL.createObjectURL(this.form.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadTentangFoto(this.form.currentImage)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.form.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.currentImage = undefined;
        });
    },
    del(foto) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        axios
          .delete(
            this.$pathApi + "api/dashboard/infoperusahaan/foto/" + foto.id
          )
          .then((res) => {
            this.load();
            console.log(res);
          });
      }
    },
  },
};
</script>
  
  <style>
</style>