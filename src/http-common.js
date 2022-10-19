import axios from "axios";

export default axios.create({
  baseURL: "https://2d08-114-110-23-154.ap.ngrok.io/",
  headers: {
    "Content-type": "application/json"
  }
});