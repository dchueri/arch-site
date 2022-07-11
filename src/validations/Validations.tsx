import { message } from "antd";
import { IUserEntity } from "../context/AuthProvider/types";
import { Api } from "../services/api";

export default class Validations {
  static verifyPasswordLength(password: string): Boolean {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }

  static verifyNameLength(name: string): Boolean {
    if (name.length >= 1) {
      return true;
    } else {
      return false;
    }
  }

  static verifyIfIsEmail(email: string): Boolean {
    if (email.includes('@')) {
      return true;
    } else {
      return false;
    }
  }

  static async verifyIfEmailExists(email: string) {
    let users: IUserEntity[] = [];
    let result: boolean = true;
    await Api.get("https://dcode-arch-app.herokuapp.com/user").then((res) => {
      users = res.data;
    });
    users?.map((u) => {
      if(u.email === email) {
        result = false;
      }
    })
    return result;
  }
}
