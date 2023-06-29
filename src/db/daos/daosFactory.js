import logger from "../../utils/loggers.js";
const dBforConsole = process.argv[3];
import IndexDaoFs from "./index/indexDaoFs.js";

const instancias = [
  {
    name: IndexDaoFs,
    id: "fs",
    description: "index",
  },
];

const instancia = instancias.filter((el) => el.id === dBforConsole);
const rutaResult = {
  [instancia[0].description]: instancia[0].name,
};

logger.log("info", `✅ Conectado ah la DB ${dBforConsole}`);

const DaoIndex = new rutaResult.index();

export { DaoIndex };
