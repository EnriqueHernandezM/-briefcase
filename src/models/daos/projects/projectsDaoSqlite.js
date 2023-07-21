import ContainerProjectsSqlite from "../../sqlite/projects.js";
export default class ProjectsDaoSqlite extends ContainerProjectsSqlite {
  constructor() {
    super("projects");
  }
}
