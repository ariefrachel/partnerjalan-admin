import axios from "axios";

export default axios.create({
  baseURL: "https://plain-views-cry-103-191-109-11.loca.lt/",

  headers: {
    "Content-type": "application/json"
  }
});
