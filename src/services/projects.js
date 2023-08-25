import { DaoProjects } from "../models/daos/daosFactory.js";
import Joi from "joi";
import uploadToBucket from "../utils/s3.js";
import aroundConfig from "../config/default.js";
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
  async newProject(dataOfProject, files) {
    try {
      if (aroundConfig.dbUse === "sQlite" && files.length < 1) {
        throw new Error("no images files");
      }
      let arrIMages;
      if (dataOfProject.imagesProject === undefined) {
        arrIMages = await Promise.all(
          files.files.map(async (file) => {
            const storeImages = await uploadToBucket(aroundConfig.awsNameBucket, file);
            return storeImages;
          })
        );
      } else if (files.length < 1) {
        arrIMages = dataOfProject.imagesProject;
      }
      dataOfProject.tagsProject = dataOfProject.tagsProject.split(",");
      dataOfProject.imagesProject = arrIMages;
      ContainerProjects.checkElementsProject(dataOfProject);
      const addNewProjects = await DaoProjects.newProyectDb(dataOfProject);
      if (addNewProjects.length) {
        return {
          succes: true,
          ProjectsActualized: addNewProjects,
        };
      }
    } catch (err) {
      throw err;
    }
  }
  async updateAproject(idToUpdate, dataForModified, files) {
    try {
      if (aroundConfig.dbUse === "sQlite" && files.length < 1) {
        throw new Error("no images files");
      }
      let arrImagesUpdate;
      if (dataForModified.imagesProject === undefined) {
        arrImagesUpdate = await Promise.all(
          files.files.map(async (file) => {
            const storeImages = await uploadToBucket(aroundConfig.awsNameBucket, file);
            return storeImages;
          })
        );
      } else if (files.length < 1) {
        arrImagesUpdate = dataForModified.imagesProject;
      }
      dataForModified.imagesProject = arrImagesUpdate;
      dataForModified.tagsProject = dataForModified.tagsProject.split(",");
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
      nameProject: Joi.string().min(1).max(50).required(),
      tagsProject: Joi.array().max(15).items(Joi.string()).required(),
      description: Joi.string().min(5).max(230).required(),
      imagesProject: Joi.array().max(4).items(Joi.string()).required(),
      urlProject: Joi.string().required(),
    });
    const { error } = CreateProjectSchema.validate(project);
    if (error) {
      throw error;
    }
  }
}
