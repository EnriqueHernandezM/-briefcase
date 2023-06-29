import logger from "../../utils/loggers.js";
import fs from "fs";

export default class ContainerIndexFs {
  constructor(file) {
    this.file = file;
  }

  getMyRoutesDb(withId) {
    try {
      const routesExiting = fs.readFileSync(this.file, "utf8");
      const routs = routesExiting ? JSON.parse(routesExiting) : [];
      if (withId) {
        return routs;
      }
      const removeId = routs.reduce((acc, item) => {
        acc[item.name] = item.urlAddres;
        return acc;
      }, {});

      return removeId;
    } catch (err) {
      throw err;
    }
  }
  addRoutesDb(routAdd) {
    try {
      const allAddresExisting = this.getMyRoutesDb(true);
      let id = 1;
      let x = allAddresExisting.filter((el) => el.urlAddres === routAdd.urlAddres);
      if (x.length > 0) {
        return { msge: "existing rout" };
      }
      allAddresExisting.length > 0 &&
        allAddresExisting.forEach((el) => {
          id = el.id + 1;
        });
      routAdd.id = id;
      allAddresExisting.push(routAdd);
      const newRout = JSON.stringify(allAddresExisting);
      fs.writeFileSync(this.file, newRout);
      return allAddresExisting;
    } catch (err) {
      throw err;
    }
  }

  deleteOneRoutDb(id) {
    try {
      const allAddresExisting = this.getMyRoutesDb(true);
      const catchI = allAddresExisting.findIndex((elId) => elId.id == id);
      if (catchI >= 0) {
        allAddresExisting.splice(catchI, 1);
        const arrModified = JSON.stringify(allAddresExisting);
        fs.writeFileSync(this.file, arrModified);
        return { msge: "true" };
      } else if (catchI === -1) {
        throw new Error("no id available");
      }
      console.log(catchI);
    } catch (err) {
      throw err;
    }
  }
}
