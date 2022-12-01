import axios from "axios";

export default axios.create({
  baseURL: "https://f189-114-5-216-179.ap.ngrok.io/",
  headers: {
    "Content-type": "application/json"
  }
});
