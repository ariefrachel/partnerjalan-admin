import axios from "axios";

export default axios.create({
  baseURL: "https://8516-114-110-23-154.ap.ngrok.io/",
  headers: {
    "Content-type": "application/json"
  }
});