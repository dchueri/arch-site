import { message } from "antd";
import { convertLegacyProps } from "antd/lib/button/button";
import axios from "axios";
import { IUserEntity } from "../../context/AuthProvider/types";
import { Api } from "../../services/api";

export default class UserService {
  static async editUser(name: string, email: string, password: string) {
    const user = { name: name, email: email, password: password };
    console.log(JSON.stringify(user));
    await Api
      .put("https://dcode-arch-app.herokuapp.com/user", user)
      .then((res) => console.log(res)).catch((res) => message.error(res.response.data.message));
  }

  static async findOne(userId: string) {
    return await Api.get('https://dcode-arch-app.herokuapp.com/user/' + userId).then(res => {return res.data})
  }
}
