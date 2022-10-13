<template>
  <div class="partnership" id="content">
    <SidebarNav />
    <div class="partnerHeader d-flex justify-content-between">
      <h2>Partnership</h2>
      <div>
        <b-button class="btn btn-primary" v-b-modal.modal-center
          >Tambah</b-button
        >
        <b-modal
          id="modal-center"
          ref="modal-partnership"
          hide-footer
          centered
          title="Tambah Partnership"
        >
          <b-form-group
            label="Upload Gambar"
            label-for="form-image"
            label-cols-lg="4"
          >
            <b-input-group>
              <div class="row">
                <div class="col-8">
                  <label class="btn btn-default p-0">
                    <input
                      type="file"
                      accept="image/*"
                      ref="file"
                      @change="selectImage"
                    />
                  </label>
                </div>
                <br />
                <div v-if="previewImage">
                  <div>
                    <img
                      class="preview my-3"
                      :src="previewImage"
                      alt="preview"
                      style="width: 25%"
                    />
                  </div>
                </div>
                <br />
                <div class="d-flex justify-content-end">
                  <b-button
                    class="btn mt-3 me-3"
                    id="hide-btn"
                    @click="hideModal"
                    >Batal</b-button
                  >
                  <b-button
                    class="btn btn-primary mt-3"
                    :disabled="!currentImage"
                    @click="upload"
                    >Tambah Data</b-button
                  >
                </div>

                <div v-if="message" class="alert alert-secondary" role="alert">
                  {{ message }}
                </div>
              </div>
            </b-input-group>
          </b-form-group>
        </b-modal>
      </div>
    </div>
    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
      style="margin-top: 21px"
    >
      <div class="col" v-for="partner in partnership" :key="partner.id">
        <div class="card partnerContent">
          <div class="partnerLogo d-flex align-items-center">
            <img
              :src="pathPartner + partner.path"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body">
            <div style="float: right; margin-top: 7px">
              <button class="btn btn-edit" style="margin-right: 14px">
                Edit
              </button>
              <button class="btn btn-delete" @click="del(partner)">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common";
import UploadService from "../services/UploadFilesService";
import SidebarNav from "@/components/SidebarNav.vue";
export default {
  name: "PartnershipView",
  components: {
    SidebarNav,
  },
  data() {
    return {
      currentImage: undefined,
      previewImage: undefined,

      message: "",
      partnership: [],
      pathPartner: this.$pathApi,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    showModal() {
      this.$refs["modal-partnership"].show();
    },
    hideModal() {
      this.$refs["modal-partnership"].hide();
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.message = "";
    },
    upload() {
      UploadService.uploadPartnership(this.currentImage)
        .then((response) => {
          this.message = response.data.message;
          this.message = "Image successfully uploaded !";
          this.hideModal();
          this.load();
          this.message = "";
          this.previewImage = undefined;
        })
        .catch((err) => {
          this.message = "Could not upload the image!" + err;
          this.currentImage = undefined;
        });
    },
    async load() {
      try {
        const partnership = await http.get("api/user/partnership", {
          headers: {
            "ngrok-skip-browser-warning": 1,
          },
        });

        this.partnership = partnership.data;
      } catch (e) {
        console.log(e);
      }
    },
    del(partner) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        http.delete("api/dashboard/partnership/" + partner.id).then((res) => {
          this.load();
          console.log(res);
        });
      }
    },
  },
};
</script>
  