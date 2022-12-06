import axios from "axios";

export default axios.create({
  baseURL: "https://good-planes-retire-103-191-109-11.loca.lt/",
  headers: {
    "ngrok-skip-browser-warning": 1,
    "Content-type": "application/json"
  }
});