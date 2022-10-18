import http from "../http-common";

class UpdateFilesService {
    updateTestimoni(id,file,caption) {
        let formDataTestimoni = new FormData();
    
        formDataTestimoni.append("file", file);
        formDataTestimoni.append("caption", caption)
    
        return http.patch("api/dashboard/testimoni/" + id, formDataTestimoni, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        });
      }
      updateMedsos(id,file,medsos) {
        let formDataMedsos = new FormData();
    
        formDataMedsos.append("file", file);
        formDataMedsos.append("caption", medsos)
    
        return http.patch("api/dashboard/medsos/" + id, formDataMedsos, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        });
      }
      updateKota(id,file,kota) {
        let formDataKota = new FormData();
    
        formDataKota.append("file", file);
        formDataKota.append("kota", kota)
    
        return http.patch("api/dashboard/kota/" + id, formDataKota, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        });
      }
      updatePaket(id,file,namapaket,hari,harga) {
        let formDataPaket = new FormData();
    
        formDataPaket.append("file", file);
        formDataPaket.append("namapaket", namapaket)
        formDataPaket.append("hari", hari)
        formDataPaket.append("harga", harga)
    
        return http.patch("api/dashboard/paket/" + id, formDataPaket, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        });
      }
}

export default new UpdateFilesService();