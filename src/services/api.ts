import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const Api = axios.create({
  baseURL: "https://dcode-arch-app.herokuapp.com/",
});

Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const user = getUserLocalStorage() || "";
Api.defaults.headers.common["Authorization"] = "Bearer " + user.token;
Api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Api.defaults.headers.common['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";