import knexInstance from "./options/sqlite.js";

export default class ContainerAuthSqlite {
  constructor(file) {
    this.file = file;
  }
  async getMyUserDb() {
    try {
      const userExistingSqlite = await knexInstance(this.file).select("*");
      const user = userExistingSqlite ? userExistingSqlite : [];
      return user;
    } catch (err) {
      throw err;
    }
  }
  async createdAdminDb(objectAdmin) {
    try {
      const createAdmin = await knexInstance(this.file).insert(objectAdmin, ["user", "name", "password", "id"]);
      return createAdmin;
    } catch (err) {
      throw err;
    }
  }
}
