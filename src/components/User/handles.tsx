import { message } from "antd";
import Validations from "../../validations/Validations";
import UserService from "./services";

export default class UserHandles {
  async submit(submit: any, mail: string) {
    if (submit.password === submit.passwordConfirmation) {
      if (
        Validations.verifyPasswordLength(submit.password) ||
        submit.password.length == 0
      ) {
        if (Validations.verifyNameLength(submit.name)) {
          if (Validations.verifyIfIsEmail(submit.email)) {
            if (submit.email == mail) {
              if (submit.password.length > 0) {
                await UserService.editUser(
                  submit.id,
                  submit.name,
                  submit.email,
                  submit.role,
                  submit.password
                ).then(message.success("Usuário atualizado com sucesso."));
              } else {
                await UserService.editUser(
                  submit.id,
                  submit.name,
                  submit.email,
                  submit.role
                ).then(message.success("Usuário atualizado com sucesso."));
              }
            } else {
              if (await Validations.verifyIfEmailExists(submit.email)) {
                if (submit.password.length > 0) {
                  await UserService.editUser(
                    submit.id,
                    submit.name,
                    submit.email,
                    submit.role,
                    submit.password
                  ).then(message.success("Usuário atualizado com sucesso."));
                } else {
                  await UserService.editUser(
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

  async deleteUser(userId: string) {
    await UserService.deleteUser(userId)
    message.success("Usuário excluído com sucesso.");
  }
}
