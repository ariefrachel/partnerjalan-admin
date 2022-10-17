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
}

export default new UpdateFilesService();