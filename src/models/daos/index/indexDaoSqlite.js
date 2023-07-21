import ContainerIndexSqlite from "../../sqlite/index.js";

export default class IndexDaoSqlite extends ContainerIndexSqlite {
  constructor() {
    super("index");
  }
}
