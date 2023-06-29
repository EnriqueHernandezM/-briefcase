import ContainerIndex from "../services/index.js";
import logger from "../utils/loggers.js";
const containerIndex = new ContainerIndex();
import { notFound, errorHandler } from "../middleware/error.middleware.js";
async function getIndex(req, res, next) {
  try {
    const myRoutes = await containerIndex.getMyRouts();
    res.status(200).json(myRoutes);
  } catch (err) {
    logger.log("error", `err_in_controller_get_index:${err}`);
    next(err);
  }
}

async function postRoute(req, res, next) {
  try {
    const { body } = req;
    const resAddNewRoute = await containerIndex.addRoutes(body);
    res.status(201).json(resAddNewRoute);
  } catch (err) {
    logger.log("error", `err_in_controller_postRoute${err}`);
    next(err);
  }
}
async function deleteRout(req, res, next) {
  try {
    const { deleteRoutId } = req.query;
    const resDeleteEl = await containerIndex.deleteOneRout(deleteRoutId);
    res.status(200).json(resDeleteEl);
  } catch (err) {
    logger.log("error", `err_in_deleteRout${err}`);
    next(err);
  }
}
export { getIndex, postRoute, deleteRout };
