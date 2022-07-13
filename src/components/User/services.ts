import { message } from "antd";
import { Api } from "../../services/api";
import Validations from "../../validations/Validations";

export default class UserServices {
  static async editUser(
    id: string,
    name: string,
    email: string,
    role: string,
    password?: string
  ) {
    let user = {};
    if (password) {
      user = {
        id: id,
        name: name,
        email: email,
        role: role,
        password: password,
      };
    } else {
      user = { id: id, name: name, email: email, role: role };
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

  static async findAll() {
    return await Api.get("https://dcode-arch-app.herokuapp.com/user");
  }

  static async createUser(name: string, email: string, password: string) {
    const user = { name: name, email: email, password: password };
    await Api.post("https://dcode-arch-app.herokuapp.com/user", user)
      .then((res) => console.log(res))
      .catch((res) => message.error(res.response.data.message));
  }

  static async deleteUser(userId: string) {
    await Api.delete(
      "https://dcode-arch-app.herokuapp.com/user/" + userId
    );
    message.success("Usuário excluído com sucesso.");
  }

  static async submitEditForm(submit: any, mail: string) {
    if (submit.password === submit.passwordConfirmation) {
      if (
        Validations.verifyPasswordLength(submit.password) ||
        submit.password.length == 0
      ) {
        if (Validations.verifyNameLength(submit.name)) {
          if (Validations.verifyIfIsEmail(submit.email)) {
            if (submit.email == mail) {
              if (submit.password.length > 0) {
                await this.editUser(
                  submit.id,
                  submit.name,
                  submit.email,
                  submit.role,
                  submit.password
                ).then(message.success("Usuário atualizado com sucesso."));
              } else {
                await this.editUser(
                  submit.id,
                  submit.name,
                  submit.email,
                  submit.role
                ).then(message.success("Usuário atualizado com sucesso."));
              }
            } else {
              if (await Validations.verifyIfEmailExists(submit.email)) {
                if (submit.password.length > 0) {
                  await this.editUser(
                    submit.id,
                    submit.name,
                    submit.email,
                    submit.role,
                    submit.password
                  ).then(message.success("Usuário atualizado com sucesso."));
                } else {
                  await this.editUser(
                    submit.id,
                    submit.name,
                    submit.email,
                    submit.role
                  ).then(message.success("Usuário atualizado com sucesso."));
                }
              } else {
                return message.error("E-mail já cadastrado.");
              }
            }
          } else {
            return message.error("E-mail inválido.");
          }
        } else {
          return message.error("Nome inválido.");
        }
      } else {
        message.error("A senha deve possuir no mínimo 6 caracteres.");
      }
    } else {
      message.error("As senhas devem ser iguais.");
    }
  }
}
