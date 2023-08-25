import fs from "fs";

export default class ContainerProyectsFs {
  constructor(file) {
    this.file = file;
  }
  getAllProjectsDb() {
    try {
      const projectsExisting = fs.readFileSync(this.file, "utf-8");
      const projects = projectsExisting ? JSON.parse(projectsExisting) : [];
      return projects;
    } catch (err) {
      throw err;
    }
  }
  getAprojectByIdDb(idRecivied) {
    try {
      const allDataProjects = this.getAllProjectsDb();
      const indexOfData = allDataProjects.findIndex((el) => el.id == idRecivied);
      if (indexOfData >= 0) {
        const catchTheProject = allDataProjects.find((el) => el.id == idRecivied);
        return catchTheProject;
      } else if (indexOfData === -1) {
        throw new Error("no id available");
      }
    } catch (err) {
      throw err;
    }
  }
  newProyectDb(datasProyect) {
    try {
      let id = 1;
      const existingProjects = this.getAllProjectsDb();
      existingProjects.length > 0 &&
        existingProjects.forEach((el) => {
          id = el.id + 1;
        });
      datasProyect.id = id;
      existingProjects.push(datasProyect);
      const updateProjects = JSON.stringify(existingProjects);
      fs.writeFileSync(this.file, updateProjects);
      return existingProjects;
    } catch (err) {
      throw err;
    }
  }
  updateAprojectDb(idToUpdate, dataUpdate) {
    try {
      const allProjectsInDb = this.getAllProjectsDb();
      const catchIdToModified = allProjectsInDb.findIndex((el) => el.id == idToUpdate);
      if (catchIdToModified >= 0) {
        let id = allProjectsInDb[catchIdToModified].id;
        const updateProject = { ...dataUpdate, id };
        allProjectsInDb[catchIdToModified] = updateProject;
        const okUpdateProject = JSON.stringify(allProjectsInDb);
        fs.writeFileSync(this.file, okUpdateProject);
        console.log(updateProject);
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
