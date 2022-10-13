import http from "../http-common";

class UploadFilesService {
  uploadKota(file,namakota) {
    let formDataKota = new FormData();

    formDataKota.append("file", file);
    formDataKota.append("kota", namakota)

    return http.post("api/dashboard/kota/", formDataKota, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
  uploadPartnership(file) {
    let formDataPartnership = new FormData();

    formDataPartnership.append("file", file);

    return http.post("api/dashboard/partnership/", formDataPartnership, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
  uploadTestimoni(file,caption) {
    let formDataTestimoni = new FormData();

    formDataTestimoni.append("file", file);
    formDataTestimoni.append("caption", caption)

    return http.post("api/dashboard/testimoni/", formDataTestimoni, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
  uploadKontak(file,contact) {
    let formDataKontak = new FormData();

    formDataKontak.append("file", file);
    formDataKontak.append("contact", contact)

    return http.post("api/dashboard/contact/", formDataKontak, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
  uploadMedsos(file,medsos) {
    let formDataMedsos = new FormData();

    formDataMedsos.append("file", file);
    formDataMedsos.append("namamedsos", medsos)

    return http.post("api/dashboard/medsos/", formDataMedsos, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
  uploadPaket(file,kotaid,namapaket,hari,harga) {
    let formDataPaket = new FormData();

    formDataPaket.append("file", file);
    formDataPaket.append("kotaid", kotaid)
    formDataPaket.append("namapaket", namapaket)
    formDataPaket.append("hari", hari)
    formDataPaket.append("harga", harga)

    return http.post("api/dashboard/paket/", formDataPaket, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }
}

export default new UploadFilesService();