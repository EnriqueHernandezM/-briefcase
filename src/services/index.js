import { DaoIndex } from "../models/daos/daosFactory.js";
import logger from "../utils/loggers.js";
import Joi from "joi";
export default class ContainerIndex {
  constructor() {}
  async getMyRouts() {
    try {
      const resMyRoutes = await DaoIndex.getMyRoutesDb();
      return resMyRoutes;
    } catch (err) {
      throw err;
    }
  }
  async addRoutes(routToAdd) {
    try {
      ContainerIndex.checkUrlAdd(routToAdd);
      const newRout = await DaoIndex.addRoutesDb(routToAdd);
      if (newRout.length) {
        return {
          succes: "true",
          newRout,
        };
      }
    } catch (err) {
      throw err;
    }
  }
  async deleteOneRout(id) {
    try {
      const elementDelet = await DaoIndex.deleteOneRoutDb(id);
      return elementDelet;
    } catch (err) {
      throw err;
    }
  }
  static checkUrlAdd(urlObject) {
    try {
      ContainerIndex.validar(urlObject);
    } catch (err) {
      throw err;
    }
  }
  static validar(url) {
    const CreateProductsSchema = Joi.object({
      name: Joi.string().required(),
      urlAddres: Joi.string().required(),
    });
    const { error } = CreateProductsSchema.validate(url);
    if (error) {
      throw error;
    }
  }
}
