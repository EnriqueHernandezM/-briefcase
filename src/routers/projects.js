import { Router } from "express";
import { getAllMyProjects, getOneProjectById, postNewProject, putOneProject, deleteOneProject } from "../controller/projects.js";
const projects = new Router();

projects.get("/getAllProjects", getAllMyProjects);
projects.get("/getAproject/:id", getOneProjectById);
projects.post("/postAnewProject", postNewProject);
projects.put("/modifiedAproject/:id", putOneProject);
projects.delete("/deleteAproject/:id", deleteOneProject);

export { projects };
