import knexInstance from "./options/sqlite.js";

export default class ContainerProjectsSqlite {
  constructor(file) {
    this.file = file;
  }
  async getAllProjectsDb() {
    try {
      let getTableProjects = await knexInstance.from(this.file).select("*");
      const actualProjects = await Promise.all(
        getTableProjects.map(async (el) => {
          let arrTags = await knexInstance.select("tagsProject").from("tagsProjects").where("tagsId", "=", el.id);
          let arrImages = await knexInstance.select("imagesProject").from("imagesProjects").where("imagesId", "=", el.id);
          let imagesProject = [];
          let tagsProject = [];
          arrTags.forEach((tag) => tagsProject.push(tag.tags));
          arrImages.forEach((image) => imagesProject.push(image.images));
          return await {
            ...el,
            tagsProject,
            imagesProject,
          };
        })
      );
      return actualProjects;
    } catch (err) {
      throw err;
    }
  }
  async getAprojectByIdDb(idRecivied) {
    try {
      const getByIIdSqlite = await knexInstance(this.file).where({ id: `${idRecivied}` });

      if (getByIIdSqlite.length === 0) {
        throw new Error("no id available");
      }
      const projectById = await Promise.all(
        getByIIdSqlite.map(async (el) => {
          let imagesById = await knexInstance.select("imagesProject").from("imagesProjects").where("imagesId", "=", el.id);
          let tagsById = await knexInstance.select("tagsProject").from("tagsProjects").where("tagsId", "=", el.id);
          let imagesProject = [];
          let tagsProject = [];
          imagesById.forEach((image) => imagesProject.push(image.images));
          tagsById.forEach((tag) => tagsProject.push(tag.tags));
          return {
            ...el,
            imagesProject,
            tagsProject,
          };
        })
      );
      for (const convertObject of projectById) {
        return convertObject;
      }
    } catch (err) {
      throw err;
    }
  }
  async newProyectDb(datasProyect) {
    try {
      const elementForTableProjects = {
        nameProject: datasProyect.nameProject,
        description: datasProyect.description,
        urlProject: datasProyect.urlProject,
      };
      const arrForTableImages = datasProyect.imagesProject;
      const arrForTableTags = datasProyect.tagsProject;
      const addTableProjects = await knexInstance(this.file).insert(elementForTableProjects, ["id", "nameProject"]);
      const idToUseInForeingKey = addTableProjects[0].id;
      let nameProjectAdd = addTableProjects[0].nameProject;
      let idForeingImgs;
      let idForeigTags;
      for (const img of arrForTableImages) {
        const addTableImages = await knexInstance("imagesProjects").insert({ imagesProject: img, imagesId: idToUseInForeingKey }, [
          "imagesId",
        ]);
        idForeingImgs = addTableImages[0].imagesId;
      }
      for (const tag of arrForTableTags) {
        const addTableTags = await knexInstance("tagsProjects").insert({ tagsProject: tag, tagsId: idToUseInForeingKey }, ["tagsId"]);
        idForeigTags = addTableTags[0].tagsId;
      }
      if (nameProjectAdd === datasProyect.nameProject && idForeingImgs === idToUseInForeingKey && idForeigTags === idToUseInForeingKey) {
        const dbSqliteActualized = await this.getAllProjectsDb();
        return dbSqliteActualized;
      }
    } catch (err) {
      throw err;
    }
  }
  async updateAprojectDb(idToUpdate, dataUpdate) {
    //devuelVEUnOveto el update obvio imbecil
    try {
      const allProjectsInDbSqlite = await this.getAllProjectsDb();
      const catchIdToModified = allProjectsInDb.findIndex((el) => el.id == idToUpdate);
      if (catchIdToModified >= 0) {
        let id = allProjectsInDb[catchIdToModified].id;
        const updateProject = { ...dataUpdate, id };
        allProjectsInDb[catchIdToModified] = updateProject;
        const okUpdateProject = JSON.stringify(allProjectsInDb);
        fs.writeFileSync(this.file, okUpdateProject);
        return updateProject;
      } else if (catchIdToModified === -1) {
        throw new Error("no id available");
      }
    } catch (err) {
      throw err;
    }
  }
  deleteAprojectDb(idToDelete) {
    try {
      const getAllProjectsToDelete = this.getAllProjectsDb();
      const catchElToDel = getAllProjectsToDelete.findIndex((el) => el.id == idToDelete);
      if (catchElToDel >= 0) {
        getAllProjectsToDelete.splice(catchElToDel, 1);
        const arrModifiedBeDelete = JSON.stringify(getAllProjectsToDelete);
        fs.writeFileSync(this.file, arrModifiedBeDelete);
        return { msge: true };
      } else if (catchElToDel === -1) {
        throw new Error("no id available");
      }
    } catch (err) {
      throw err;
    }
  }
}
