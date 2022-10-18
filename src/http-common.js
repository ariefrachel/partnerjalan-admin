import axios from "axios";

export default axios.create({
  baseURL: "https://fa4a-114-110-23-154.ap.ngrok.io/",
  headers: {
    "Content-type": "application/json"
  }
});