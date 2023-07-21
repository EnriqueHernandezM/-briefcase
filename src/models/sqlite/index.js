import knexInstance from "./options/sqlite.js";

export default class ContainerIndexSqlite {
  constructor(file) {
    this.file = file;
  }

  async getMyRoutesDb(withId) {
    try {
      const routesExitingMySqlte = await knexInstance("index").select("*");
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
      const addNewRout = await knexInstance("index").insert(routAdd, ["id", "name"]);
      console.log(addNewRout); /* la respuesta me da un array con el iner del largo d efilas */
      console.log("producto Guardado correctamente");
      const myRes = await this.getMyRoutesDb();
      return myRes;
    } catch (err) {
      throw err;
    }
  }
}
