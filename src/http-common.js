import axios from "axios";

export default axios.create({
  baseURL: "https://c629-103-191-109-11.ap.ngrok.io/",

  headers: {
    "Content-type": "application/json"
  }
});
