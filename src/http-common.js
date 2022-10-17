import axios from "axios";

export default axios.create({
  baseURL: "https://3ecd-114-110-23-154.ap.ngrok.io/",
  headers: {
    "Content-type": "application/json"
  }
});