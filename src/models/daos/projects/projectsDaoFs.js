import ContainerProyectsFs from "../../fileSystem/projects.js";

export default class ProjectsDaoFs extends ContainerProyectsFs {
  constructor() {
    super("dataProjects.json");
  }
}
