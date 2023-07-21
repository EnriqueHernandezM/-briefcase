import ContainerAuthFs from "../../fileSystem/auth.js";

export default class AuthDaoFs extends ContainerAuthFs {
  constructor() {
    super("dataAdmin.json");
  }
}
