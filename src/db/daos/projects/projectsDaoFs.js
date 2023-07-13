import ContainerProyectsFs from "../../fileSystem/proyects.js";

export default class ProjectsDaoFs extends ContainerProyectsFs {
  constructor() {
    super("dataProjects.json");
  }
}
