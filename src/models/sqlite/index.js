import knexInstance from "./options/sqlite.js";

export default class ContainerIndexSqlite {
  constructor(file) {
    this.file = file;
  }

  async getMyRoutesDb() {
    try {
      const routesExitingMySqlte = await knexInstance(this.file).select("*");
      const routsOk = routesExitingMySqlte ? routesExitingMySqlte : [];
      if (withId) {
        return routsOk;
      }
      const removeIdRouts = routsOk.reduce((acc, item) => {
        acc[item.name] = item.urlAddres;
        return acc;
      }, {});
      return removeIdRouts;
    } catch (err) {
      throw err;
    }
  }
  async addRoutesDb(routAdd) {
    try {
      const getMyRoutSqlite = await this.getMyRoutesDb(true);
      let noRepeat = getMyRoutSqlite.filter((el) => el.urlAddres === routAdd.urlAddres);
      if (noRepeat.length > 0) {
        throw new Error("existing rout");
      }
      await knexInstance(this.file).insert(routAdd, ["id", "name"]);
      const myRes = await this.getMyRoutesDb(true);
      return myRes;
    } catch (err) {
      throw err;
    }
  }
  async deleteOneRoutDb(id) {
    try {
      const deleteARout = await knexInstance(this.file).where("id", "=", id).del();
      if (deleteARout === 0) {
        throw new Error("no id available");
      } else {
        return { msge: true };
      }
    } catch (err) {
      throw err;
    }
  }
}
