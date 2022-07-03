import axios from "axios";

export const Api = axios.create({
  baseURL: "https://dcode-arch-app.herokuapp.com/",
});
