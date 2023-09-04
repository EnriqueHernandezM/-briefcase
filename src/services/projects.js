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
      if (aroundConfig.dbUse === "sQlite" && (files.files === undefined || files.files.length < 1)) {
        throw new Error("No images files");
      }
      if (aroundConfig.dbUse === "fs" && dataOfProject.imagesProject === typeof undefined)
        throw new Error("In fs dont acept files only array");
      let arrIMages;
      if (files && files.files) {
        ContainerProjects.validateImg(files.files);
        arrIMages = await Promise.all(
          files.files.map(async (file) => {
            return await uploadToBucket(aroundConfig.awsNameBucket, file);
          })
        );
      } else if (dataOfProject.imagesProject && dataOfProject.imagesProject.length > 0) {
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
      if (aroundConfig.dbUse === "sQlite" && (files.files === undefined || files.files.length < 1)) {
        throw new Error("No images files");
      }
      if (aroundConfig.dbUse === "fs" && dataForModified.imagesProject === typeof undefined)
        throw new Error("In fs dont acept files only array");
      let arrImagesUpdate;
      if (files && files.files) {
        ContainerProjects.validateImg(files.files);
        arrImagesUpdate = await Promise.all(
          files.files.map(async (file) => {
            return await uploadToBucket(aroundConfig.awsNameBucket, file);
          })
        );
      } else if (dataForModified.imagesProject && dataForModified.imagesProject.length > 0) {
        arrImagesUpdate = dataForModified.imagesProject;
      }
      dataForModified.tagsProject = dataForModified.tagsProject.split(",");
      dataForModified.imagesProject = arrImagesUpdate;
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
  static validateImg(imgs) {
    imgs.forEach((img) => {
      if (!img.name.endsWith(".png") && !img.name.endsWith(".jpg") && !img.name.endsWith(".jpeg")) {
        throw new Error("only png,jpg,jpeg");
      }
      if (img.size > 2000000) {
        throw new Error("an image has exceeded the weight");
      }
    });
  }
}
