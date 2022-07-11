import { message } from "antd";
import { CreateProjectEntity } from "../../context/ProjectProvider/types";
import { Api } from "../../services/api";

export default class ProjectServices {
  /* static async editProject(
    id: string,
    description: string,
    idOfResponsible: string,
  ) {
    let project = {}
    project = { id: id, name: name, email: email, role: role};
    await Api.put("https://dcode-arch-app.herokuapp.com/contract", project)
      .then()
      .catch((res) => message.error(res.response.data.message));
  }
 */
/*   static async findOne(userId: string) {
    return await Api.get(
      "https://dcode-arch-app.herokuapp.com/user/" + userId
    ).then((res) => {
      return res.data;
    });
  } */

  static async createProject(project: CreateProjectEntity) {
    await Api
      .post("https://dcode-arch-app.herokuapp.com/contract", project)
      .then((res) => console.log(res)).catch((res) => message.error(res.response.data.message));
  }

  static catchUserIdByName(name: string, userNames: string[], userIds: string[]): string {
    return userIds[userNames.indexOf(name)]
  }

/*   static async deleteUser(userId: string) {
    return await Api.delete(
      "https://dcode-arch-app.herokuapp.com/user/" + userId
    );
  } */
}