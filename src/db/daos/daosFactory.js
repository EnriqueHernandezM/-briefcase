import logger from "../../utils/loggers.js";
const dBforConsole = process.argv[3];
import IndexDaoFs from "./index/indexDaoFs.js";
import ProjectsDaoFs from "./projects/projectsDaoFs.js";

const instancias = [
  {
    name: IndexDaoFs,
    id: "fs",
    description: "index",
  },
  {
    name: ProjectsDaoFs,
    id: "fs",
    description: "projects",
  },
];

const instancia = instancias.filter((el) => el.id === dBforConsole);
const rutaResult = {
  [instancia[0].description]: instancia[0].name,
  [instancia[1].description]: instancia[1].name,
};
logger.log("info", `✅ Conectado ah la DB ${dBforConsole}`);

const DaoIndex = new rutaResult.index();
const DaoProjects = new rutaResult.projects();

export { DaoIndex, DaoProjects };
