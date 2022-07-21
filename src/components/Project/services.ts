import { message } from "antd";
import { CreateProjectEntity, EditProjectEntity } from "../../context/ProjectProvider/types";
import { Api } from "../../services/api";

export default class ProjectServices {
  static async editProject(
    project: EditProjectEntity
  ) {
    await Api.put("https://dcode-arch-app.herokuapp.com/contract", project)
      .then()
      .catch((res) => message.error(res.response.data.message));
  }

  static async findOne(contractId: string) {
    return await Api.get(
      "https://dcode-arch-app.herokuapp.com/contract/" + contractId
    ).then((res) => {
      return res.data;
    });
  }

  static async createProject(project: CreateProjectEntity) {
    await Api.post("https://dcode-arch-app.herokuapp.com/contract", project)
      .then((res) => message.success('Projeto criado com sucesso'))
      .catch((res) => message.error(res.response.data.message));
  }

  static catchUserIdByName(
    name: string,
    userNames: string[],
    userIds: string[]
  ): string {
    return userIds[userNames.indexOf(name)];
  }

  static catchUserNameById(
    id: string,
    userNames: string[],
    userIds: string[]
  ): string {
    return userNames[userIds.indexOf(id)];
  }

  static async deleteProject(projectId: string) {
    await Api.delete(
      "https://dcode-arch-app.herokuapp.com/contract/" + projectId
    );
    message.success("Projeto excluído com sucesso.");
  }
}
