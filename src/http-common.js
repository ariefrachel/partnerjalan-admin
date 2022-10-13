import axios from "axios";

export default axios.create({
  baseURL: "https://ac37-114-110-23-154.ap.ngrok.io/",
  headers: {
    "Content-type": "application/json"
  }
});