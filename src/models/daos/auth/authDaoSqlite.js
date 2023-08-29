import ContainerAuthSqlite from "../../sqlite/auth.js";
export default class AuthDaoSqlite extends ContainerAuthSqlite {
  constructor() {
    super("admin");
  }
}
