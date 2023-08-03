import { Router } from "express";
import { getAllMyProjects, getOneProjectById, postNewProject, putOneProject, deleteOneProject } from "../controller/projects.js";
import { checkAuthentication } from "../middleware/admin.middleware.js";
const projects = new Router();

projects.get("/getAllProjects", getAllMyProjects);
projects.get("/getAproject/:id", getOneProjectById);
projects.post("/postAnewProject", checkAuthentication, postNewProject);
projects.put("/modifiedAproject/:id", checkAuthentication, putOneProject);
projects.delete("/deleteAproject/:id", checkAuthentication, deleteOneProject);

export { projects };
