<template>
  <div class="table-responsive">
    <table class="table table-light">
      <thead class="table-dark">
        <tr>
          <th scope="col">Kode Pemesanan</th>
          <th scope="col">Pilihan Paket</th>
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
          <td>Paket Wisata {{ riwayat.paket.namapaket }}</td>
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
            ><button class="btn">
              <i class="fas fa-trash" style="color: #dc3545"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal
      ref="modal-riwayat"
      centered
      hide-footer
      title="Tambah Visi dan Misi"
    >
      <form>
        <div class="d-block text-center">
          <b-form-group label="Nama Lengkap" label-cols-lg="6">
            <b-form-input type="text" v-model="form.namalengkap"></b-form-input>
          </b-form-group>
          <b-form-group label="No. Telepon" label-cols-lg="6">
            <b-form-input type="text" v-model="form.notelp"></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-cols-lg="6">
            <b-form-input type="text" v-model="form.email"></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-cols-lg="6">
            <b-form-input type="date" v-model="form.datetime"></b-form-input>
          </b-form-group>
        </div>
        <b-button class="mt-3" id="hide-btn" @click="hideModal">Batal</b-button>
        <b-button class="mt-3 ms-3" type="submit" variant="primary" block
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
      form: {
        namalengkap: "",
        notelp: "",
        email: "",
        datetime: "",
      },
      pemesanan: [],
    };
  },
  methods: {
    showModal() {
      this.$refs["modal-riwayat"].show();
    },
    hideModal() {
      this.$refs["modal-riwayat"].hide();
    },
    async load() {
      try {
        const loadriwayat = await axios.get(
          this.$pathApi + "api/dashboard/riwayat",
          {
            headers: {
              "ngrok-skip-browser-warning": 1,
            },
          }
        );

        this.pemesanan = loadriwayat.data;
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
  },
  mounted() {
    this.load();
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