import knexInstance from "./options/sqlite.js";

export default class ContainerAuthSqlite {
  constructor(file) {
    this.file = file;
  }
}
