import axios from "axios";

export default axios.create({
  baseURL: "https://8c27-175-158-53-206.ap.ngrok.io/",
  headers: {
    "Content-type": "application/json"
  }
});