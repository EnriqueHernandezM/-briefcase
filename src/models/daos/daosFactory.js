import logger from "../../utils/loggers.js";
import aroundConfig from "../../config/default.js";
const dBforConsole = aroundConfig.dbUse;
import IndexDaoFs from "./index/indexDaoFs.js";
import IndexDaoSqlite from "./index/indexDaoSqlite.js";
import ProjectsDaoFs from "./projects/projectsDaoFs.js";
import ProjectsDaoSqlite from "./projects/projectsDaoSqlite.js";
import ContainerAuthFs from "./auth/authDaoFs.js";
import ContainerAuthSqlite from "../sqlite/auth.js";
const instancias = [
  {
    name: IndexDaoFs,
    id: "fs",
    description: "index",
  },
  {
    name: IndexDaoSqlite,
    id: "sQlite",
    description: "index",
  },
  {
    name: ProjectsDaoFs,
    id: "fs",
    description: "projects",
  },
  {
    name: ProjectsDaoSqlite,
    id: "sQlite",
    description: "projects",
  },
  {
    name: ContainerAuthFs,
    id: "fs",
    description: "auth",
  },
  {
    name: ContainerAuthSqlite,
    id: "sQlite",
    description: "auth",
  },
];

const instancia = instancias.filter((el) => el.id === dBforConsole);
const rutaResult = {
  [instancia[0].description]: instancia[0].name,
  [instancia[1].description]: instancia[1].name,
  [instancia[2].description]: instancia[2].name,
};
logger.log("info", `✅ Conect to DB ${dBforConsole}`);
const DaoAuth = new rutaResult.auth();
const DaoIndex = new rutaResult.index();
const DaoProjects = new rutaResult.projects();

export { DaoIndex, DaoProjects, DaoAuth };
