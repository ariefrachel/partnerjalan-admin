import axios from "axios";

export default axios.create({
  baseURL: "https://sad-laws-rescue-103-191-109-11.loca.lt/",
  headers: {
    "Content-type": "application/json"
  }
});