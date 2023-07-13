import { pt_BR } from "@faker-js/faker";
import { DaoProjects } from "../db/daos/daosFactory.js";
import Joi from "joi";
export default class ContainerProjects {
  constructor() {}
  async getAllProjects() {
    try {
      const resAllProjects = await DaoProjects.getAllProjectsDb();
      return resAllProjects;
    } catch (err) {
      throw err;
    }
  }
  async getAprojectById(idLook) {
    try {
      const projectByIdCatch = await DaoProjects.getAprojectByIdDb(idLook);
      return projectByIdCatch;
    } catch (err) {
      throw err;
    }
  }
  async newProject(dataOfProject) {
    try {
      ContainerProjects.checkElementsProject(dataOfProject);
      const addNewProjects = await DaoProjects.newProyectDb(dataOfProject);
      if (addNewProjects.length) {
        return {
          succes: "true",
          newProject: addNewProjects,
        };
      }
    } catch (err) {
      throw err;
    }
  }
  async updateAproject(idToUpdate, dataForModified) {
    try {
      ContainerProjects.checkElementsProject(dataForModified);
      const modifiedAproject = await DaoProjects.updateAprojectDb(idToUpdate, dataForModified);
      if (Object.entries(modifiedAproject).length > 0) {
        return {
          modified: true,
          modifiedAproject,
        };
      }
    } catch (err) {
      throw err;
    }
  }
  async deleteAproject(idToDelete) {
    try {
      const projectDelete = await DaoProjects.deleteAprojectDb(idToDelete);
      return projectDelete;
    } catch (err) {
      throw err;
    }
  }
  static checkElementsProject(projectObject) {
    try {
      ContainerProjects.validar(projectObject);
    } catch (err) {
      throw err;
    }
  }
  static validar(project) {
    const CreateProjectSchema = Joi.object({
      nameProject: Joi.string().min(1).max(40).required(),
      tagsProject: Joi.array().max(10).items(Joi.string()).required(),
      description: Joi.string().min(5).max(190).required(),
      imagesProject: Joi.array().max(4).items(Joi.string()).required(),
      urlProject: Joi.string().required(),
    });
    const { error } = CreateProjectSchema.validate(project);
    if (error) {
      throw error;
    }
  }
}
