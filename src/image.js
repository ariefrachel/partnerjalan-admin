import axios from "axios";

export default axios.create({
  baseURL: "https://a1f9-103-191-109-11.ap.ngrok.io/",
  headers: {
    "ngrok-skip-browser-warning": 1,
    "Content-type": "application/json"
  }
});