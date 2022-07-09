import { message } from "antd";
import { convertLegacyProps } from "antd/lib/button/button";
import axios from "axios";
import { Api } from "../../services/api";

export default class UserService {
  static async createUser(name: string, email: string, password: string) {
    const user = { name: name, email: email, password: password };
    await Api
      .post("https://dcode-arch-app.herokuapp.com/user", user)
      .then((res) => console.log(res)).catch((res) => message.error(res.response.data.message));
  }
}
