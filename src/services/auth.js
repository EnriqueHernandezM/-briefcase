import { DaoAuth } from "../models/daos/daosFactory.js";
import Joi from "joi";
export default class ContainerAuth {
  constructor() {}
  async getInfoUser(idRecib, name, funcGetUser) {
    try {
      const resUser = await DaoAuth.getMyUserDb();
      if (resUser.length == 0) {
        funcGetUser(null, false);
      }
      for (const el of resUser) {
        if (el.id == idRecib) {
          funcGetUser(null, done);
        }
        if (idRecib === null && el.name == name) {
          funcGetUser(null, el);
        } else {
          funcGetUser(null, false);
          //return new Error("not user");
        }
      }
    } catch (err) {
      throw err;
    }
  }
  async getInfoUserToDeserialized(id, done) {
    try {
      const user = await DaoAuth.getMyUserDb();
      for (const el of user) {
        if (el.id == id) {
          done(null, el);
        } else {
          done(null, false);
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async addOneAdmin(myAdmin, funcRes) {
    try {
      const addMyAdmin = await DaoAuth.createdAdminDb(myAdmin);
      if (addMyAdmin.length > 0) {
        funcRes(null, addMyAdmin);
      }
    } catch (err) {
      throw err;
    }
  }
}
