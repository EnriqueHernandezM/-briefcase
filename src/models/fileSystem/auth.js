import fs from "fs";

export default class ContainerAuthFs {
  constructor(file) {
    this.file = file;
  }
  async getMyUserDb() {
    try {
      const userExisting = fs.readFileSync(this.file, "utf8");
      const user = userExisting ? JSON.parse(userExisting) : [];
      return user;
    } catch (err) {
      throw err;
    }
  }
  async createdAdminDb(objectAdmin) {
    try {
      const id = 1;
      objectAdmin.id = id;
      const inArray = [];
      inArray.push(objectAdmin);
      const toSaveAdmin = JSON.stringify(inArray);
      fs.writeFileSync(this.file, toSaveAdmin);
      return inArray;
    } catch (err) {
      throw err;
    }
  }
}
