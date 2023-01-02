import axios from "axios";

export default axios.create({
  baseURL: "https://b3fa-103-166-147-253.ap.ngrok.io/",

  headers: {
    "Content-type": "application/json"
  }
});
