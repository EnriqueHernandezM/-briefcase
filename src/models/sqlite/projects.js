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
          arrTags.forEach((tag) => tagsProject.push(tag.tagsProject));
          arrImages.forEach((image) => imagesProject.push(image.imagesProject));
          return {
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
          imagesById.forEach((image) => imagesProject.push(image.imagesProject));
          tagsById.forEach((tag) => tagsProject.push(tag.tagsProject));
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
    //Aun no podemos borrar ni tags ni imagenes
    try {
      const elementsUpdateForTableProjects = {
        nameProject: dataUpdate.nameProject,
        description: dataUpdate.description,
        urlProject: dataUpdate.urlProject,
      };
      const arrUpdateForTableImages = dataUpdate.imagesProject;
      const arrUpdateforTableTags = dataUpdate.tagsProject;
      const modifiedAprojectSqlite = await knexInstance("projects").where("id", "=", idToUpdate).update(elementsUpdateForTableProjects);
      if (modifiedAprojectSqlite === 0) {
        throw new Error("no id available");
      }
      //traer id existentes para modificar cada imagen
      const getIdsForEachImage = await knexInstance.select("idImages").from("imagesProjects").where("imagesId", "=", idToUpdate);
      const getIdsForEachTags = await knexInstance.select("idTags").from("tagsProjects").where("tagsId", "=", idToUpdate);
      let haveMoreImages;
      let haveMoreTags;
      let createdErr;
      getIdsForEachImage.forEach(async (imagesExisting, i, arr) => {
        if (arrUpdateForTableImages.length > arr.length) {
          haveMoreImages = arr.length;
        }
        if (arrUpdateForTableImages.length < arr.length) {
          createdErr = new Error("we still can't delete images");
        }
        const modifiedAimagesTheProject = await knexInstance("imagesProjects")
          .where("idImages", "=", imagesExisting.idImages)
          .update({ imagesProject: arrUpdateForTableImages[i] }, ["idImages"]);
      });
      if (haveMoreImages) {
        for (let newImage = haveMoreImages; newImage < arrUpdateForTableImages.length; newImage++) {
          const addImage = await knexInstance("imagesProjects").insert(
            { imagesProject: arrUpdateForTableImages[newImage], imagesId: idToUpdate },
            ["idImages"]
          );
        }
      }
      //desde aqui se hace update a tags
      getIdsForEachTags.forEach(async (tagsExisisting, i, arr) => {
        if (arrUpdateforTableTags.length > arr.length) {
          haveMoreTags = arr.length;
        }
        if (arrUpdateforTableTags.length < arr.length) {
          createdErr = new Error("we still can't delete tags");
        }
        const mofifiedTgsProject = await knexInstance("tagsProjects")
          .where("idTags", "=", tagsExisisting.idTags)
          .update({ tagsProject: arrUpdateforTableTags[i], tagsId: idToUpdate }, ["idTags"]);
      });
      if (haveMoreTags) {
        for (let newTags = haveMoreTags; newTags < arrUpdateforTableTags.length; newTags++) {
          const addTag = await knexInstance("tagsProjects").insert({ tagsProject: arrUpdateforTableTags[newTags], tagsId: idToUpdate }, [
            "idTags",
          ]);
        }
      }
      if (createdErr) {
        throw createdErr;
      }
      let getProjetc = await this.getAprojectByIdDb(idToUpdate);
      return getProjetc;
    } catch (err) {
      throw err;
    }
  }
  async deleteAprojectDb(idToDelete) {
    try {
      const deleteMyProject = await knexInstance(this.file).where("id", "=", idToDelete).del();
      if (deleteMyProject === 0) {
        throw new Error("no id available");
      } else {
        return { msge: true };
      }
    } catch (err) {
      throw err;
    }
  }
}
