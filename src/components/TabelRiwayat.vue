<template>
  <div class="table-responsive">
    <table class="table table-light">
      <thead class="table-dark">
        <tr>
          <th scope="col">Kode Pemesanan</th>
          <th scope="col">Pilihan Paket</th>
          <th scope="col">Pilihan Hotel</th>
          <th scope="col">Nama Lengkap</th>
          <th scope="col">No.Telp/WA</th>
          <th scope="col">Email</th>
          <th scope="col">Tanggal Pemesanan</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="riwayat.id" v-for="riwayat in pemesanan">
          <th scope="row">{{ riwayat.code }}</th>
          <td>
            Paket Wisata {{ riwayat.paket.namapaket }}
            <br />
            <button class="btn btn-sm btn-warning" @click="editPaket(riwayat)">
              Ubah
            </button>
          </td>
          <td>
            <button
              v-if="formHotel.hotel == ''"
              class="btn btn-sm btn-warning"
              @click="ubahHotel(riwayat)"
            >
              + Hotel
            </button>
            <div v-if="formHotel.hotel !== ''">{{ riwayat.hotel }}</div>
          </td>
          <td>{{ riwayat.namalengkap }}</td>
          <td>{{ riwayat.notelp }}</td>
          <td>{{ riwayat.email }}</td>
          <td>{{ riwayat.datetime }}</td>
          <td>
            <button class="btn" @click="edit(riwayat)">
              <i
                class="fas fa-pen-to-square"
                style="color: #f2a73b"
              ></i></button
            ><button class="btn" @click="del(riwayat)">
              <i class="fas fa-trash" style="color: #dc3545"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal ref="modal-paket" centered hide-footer title="Ubah Paket">
      <form>
        <div class="d-block">
          <b-form-group label="Nama Tempat Wisata" label-cols-lg="4">
            <b-form-select class="form-select" v-model="formPaket.paketid">
              <template #first>
                <b-form-select-option :value="null" disabled>
                  Pilih Paket
                </b-form-select-option>
              </template>
              <b-form-select-option
                :key="paket.id"
                v-for="paket in paket"
                :value="paket.id"
                >{{ paket.namapaket }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </div>
        <b-button class="mt-3" id="hide-btn" @click="hideModal2"
          >Batal</b-button
        >
        <b-button
          class="mt-3 ms-3"
          type="submit"
          variant="primary"
          block
          @click="updatePaket(form)"
          >Ubah Data</b-button
        >
      </form>
    </b-modal>
    <b-modal ref="modal-riwayat" centered hide-footer title="Edit Biodata">
      <form>
        <div class="d-block">
          <b-form-group label="Nama Lengkap" label-cols-lg="6">
            <b-form-input type="text" v-model="form.namalengkap"></b-form-input>
          </b-form-group>
          <b-form-group class="mt-2" label="No. Telepon" label-cols-lg="6">
            <b-form-input type="text" v-model="form.notelp"></b-form-input>
          </b-form-group>
          <b-form-group class="mt-2" label="Email" label-cols-lg="6">
            <b-form-input type="text" v-model="form.email"></b-form-input>
          </b-form-group>
          <b-form-group
            class="mt-2"
            label="Tanggal Berangkat"
            label-cols-lg="6"
          >
            <b-form-input type="date" v-model="form.datetime"></b-form-input>
          </b-form-group>
        </div>
        <b-button class="mt-3" id="hide-btn" @click="hideModal">Batal</b-button>
        <b-button
          class="mt-3 ms-3"
          type="submit"
          variant="primary"
          block
          @click="update(form)"
          >Ubah Data</b-button
        >
      </form>
    </b-modal>
    <!-- <b-table
      id="tabel-pemesanan"
      :items="pemesanan"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
    <br />
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="tabel-pemesanan"
    ></b-pagination> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // perPage: 3,
      // currentPage: 1,
      formHotel: {
        hotel: "",
      },
      formPaket: {
        paketid: [],
      },
      form: {
        paketid: [],
        namalengkap: "",
        notelp: "",
        email: "",
        datetime: "",
      },
      pemesanan: [],
      paket: [],
    };
  },
  methods: {
    showModal() {
      this.$refs["modal-riwayat"].show();
    },
    hideModal() {
      this.$refs["modal-riwayat"].hide();
    },
    showModal2() {
      this.$refs["modal-paket"].show();
    },
    hideModal2() {
      this.$refs["modal-paket"].hide();
    },
    async load() {
      try {
        const loadriwayat = await axios.get(
          this.$pathApi + "api/dashboard/riwayat",
          {
            headers: {
              "ngrok-skip-browser-warning": 1,
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        this.pemesanan = loadriwayat.data;
      } catch (e) {
        this.$router.push("/login");
        console.log(e);
      }
    },
    async loadPaket() {
      try {
        const paket = await axios.get(this.$pathApi + "api/dashboard/paket", {
          headers: {
            "ngrok-skip-browser-warning": 1,
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.paket = paket.data;
      } catch (e) {
        console.log(e);
      }
    },
    edit(editRiwayat) {
      this.showModal();
      this.form.id = editRiwayat.id;
      this.form.namalengkap = editRiwayat.namalengkap;
      this.form.notelp = editRiwayat.notelp;
      this.form.email = editRiwayat.email;
      this.form.datetime = editRiwayat.datetime;
    },
    async update(form) {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/riwayat/" + form.id,
          {
            namalengkap: this.form.namalengkap,
            notelp: this.form.notelp,
            email: this.form.email,
            datetime: this.form.datetime,
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
        this.form.namalengkap = "";
        this.form.notelp = "";
        this.form.email = "";
        this.form.datetime = "";
      } catch (e) {
        console.log(e);
      }
    },
    editPaket(editpaket) {
      this.showModal2();
      this.updateSubmit = true;
      this.form.id = editpaket.id;
      this.formPaket.paketid = editpaket.paketid;
    },
    async updatePaket(formPaket) {
      try {
        await axios.patch(
          this.$pathApi + "api/dashboard/riwayat/ubahpaket/" + formPaket.id,
          {
            paketid: this.formPaket.paketid,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.hideModal2();
        this.load();
        this.formPaket.id = "";
        this.formPaket.paketid = "";
      } catch (e) {
        console.log(e);
      }
    },
    del(delriwayat) {
      if (confirm("Apa kamu yakin ingin menghapus ?")) {
        axios
          .delete(this.$pathApi + "api/dashboard/riwayat/" + delriwayat.id, {
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
    this.loadPaket();
  },
  // computed: {
  //   rows() {
  //     return this.pemesanan.length;
  //   },
  // },
};
</script>

<style>
.table-dark {
  background-color: #133345;
}
</style>