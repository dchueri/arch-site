import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const Api = axios.create({
  baseURL: "https://dcode-arch-app.herokuapp.com/",
});



Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage()
    console.log(user);
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)

const user = getUserLocalStorage() || ''
Api.defaults.headers.common['Authorization'] = 'Bearer ' + user.token