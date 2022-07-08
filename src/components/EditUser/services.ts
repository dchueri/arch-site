import { message } from "antd";
import { convertLegacyProps } from "antd/lib/button/button";
import axios from "axios";
import { IUserEntity } from "../../context/AuthProvider/types";
import { Api } from "../../services/api";
import r from "../../context/routes.json";

export default class UserService {
  static async editUser(
    id: string,
    name: string,
    email: string,
    role: string,
    password?: string
  ) {
    let user = {}
    if (password) {
      user = { id: id, name: name, email: email, role: role, password: password };
    } else {
      user = { id: id, name: name, email: email, role: role};
    }
    await Api.put("https://dcode-arch-app.herokuapp.com/user", user)
      .then()
      .catch((res) => message.error(res.response.data.message));
  }

  static async findOne(userId: string) {
    return await Api.get(
      "https://dcode-arch-app.herokuapp.com/user/" + userId
    ).then((res) => {
      return res.data;
    });
  }

  static async deleteUser(userId: string) {
    return await Api.delete(
      "https://dcode-arch-app.herokuapp.com/user/" + userId
    );
  }
}
