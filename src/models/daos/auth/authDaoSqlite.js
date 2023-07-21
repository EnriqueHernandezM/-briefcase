import ContainerAuthSqlite from "../../sqlite/auth";
export default class AuthDaoSqlite extends ContainerAuthSqlite {
  constructor() {
    super("admin");
  }
}
