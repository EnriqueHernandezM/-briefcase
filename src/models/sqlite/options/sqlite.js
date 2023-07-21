import knex from "knex";
const optionsLite = {
  client: "sqlite3",
  connection: {
    filename: "./src/models/sqlite/options/DB/mydb.sqlite",
  },
  useNullAsDefault: true,
};

const knexInstance = knex(optionsLite);
export default knexInstance;
