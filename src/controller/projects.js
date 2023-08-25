import ContainerProjects from "../services/projects.js";
import logger from "../utils/loggers.js";
const containerProjects = new ContainerProjects();
import uploadBucket from "../utils/s3.js";
async function getAllMyProjects(req, res, next) {
  try {
    const getDataForProjects = await containerProjects.getAllProjects();
    res.status(200).json(getDataForProjects);
  } catch (err) {
    logger.log("error", `err_in_controller_get_all_projects:${err}`);
    next(err);
  }
}
async function getOneProjectById(req, res, next) {
  try {
    const { id } = req.params;
    const dataOneProject = await containerProjects.getAprojectById(id);
    res.status(200).json(dataOneProject);
  } catch (err) {
    logger.log("error", `err_in_controller_get_one_project_by_id:${err}`);
    next(err);
  }
}
async function postNewProject(req, res, next) {
  try {
    const { nameProject } = req.body;
    const { description } = req.body;
    const { urlProject } = req.body;
    const { tagsProject } = req.body;
    const { imagesProject } = req.body;
    const bodyForm = { nameProject, description, urlProject, tagsProject, imagesProject };
    const { files } = req;
    const answerOfCreate = await containerProjects.newProject(bodyForm, files || []);
    res.status(201).json(answerOfCreate);
  } catch (err) {
    logger.log("error", `err_in_controller_post_new_project:${err}`);
    next(err);
  }
}
async function putOneProject(req, res, next) {
  try {
    const { id } = req.params;
    const { nameProject } = req.body;
    const { description } = req.body;
    const { urlProject } = req.body;
    const { tagsProject } = req.body;
    const { imagesProject } = req.body;
    const bodyForm = { nameProject, description, urlProject, tagsProject, imagesProject };
    const { files } = req;
    const answerOfPutAproject = await containerProjects.updateAproject(id, bodyForm, files || []);
    res.status(200).json(answerOfPutAproject);
  } catch (err) {
    logger.log("error", `err_in_controller_put_project:${err}`);
    next(err);
  }
}
async function deleteOneProject(req, res, next) {
  try {
    const { id } = req.params;
    const answerDeleteProject = await containerProjects.deleteAproject(id);
    res.status(200).json(answerDeleteProject);
  } catch (err) {
    logger.log("error", `err_in_controller_delete_one-project:${err}`);
    next(err);
  }
}
export { getAllMyProjects, getOneProjectById, postNewProject, putOneProject, deleteOneProject };
