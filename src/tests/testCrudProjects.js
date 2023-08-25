import aroundConfig from "../config/default.js";
import supertest from "supertest";
const request = supertest(`http://localhost:${aroundConfig.PORT}`);
import { expect } from "chai";
import { faker } from "@faker-js/faker";
let idGenerate;
const withS3 = process.argv[3];
const tagsProject = `${faker.lorem.word()}, ${faker.lorem.word()}, ${faker.lorem.word()}`;
const description = faker.lorem.words(10);
const nameProject = faker.lorem.words(3);
const urlProject = faker.internet.url();

const generateOneProject = () => {
  return {
    nameProject: faker.lorem.words(3),
    tagsProject: `${faker.lorem.word()}, ${faker.lorem.word()}, ${faker.lorem.word()}`,
    description: faker.lorem.words(10),
    imagesProject: [faker.image.url(), faker.image.url(), faker.image.url()],
    urlProject: faker.internet.url(),
  };
};
const generateUpdateOneProject = () => {
  return {
    nameProject: faker.lorem.words(3),
    tagsProject: `${faker.lorem.word()}, ${faker.lorem.word()}, ${faker.lorem.word()}`,
    description: faker.lorem.words(20),
    imagesProject: [faker.image.url(), faker.image.url(), faker.image.url(), faker.image.url()],
    urlProject: faker.internet.url(),
  };
};
const filePathImg = `src/tests/imagesTest/back.png`;
const filePathImg2 = `src/tests/imagesTest/startGold.png`;

describe("TEST CRUD PROJECTS", () => {
  describe("GET ALL PROJECTS", () => {
    it("will respond with a array of all projects and status 200", async () => {
      const allProjects = await request.get("/api/v1/getAllProjects");
      expect(allProjects.status).to.eql(200);
      expect(allProjects.body).to.be.a("array");
    });
  });
  describe("POST A NEW PROJECT", () => {
    it("Respond with array  inside an object", async () => {
      const newProject = generateOneProject();
      let oneProjectCreated;
      switch (withS3) {
        case "true":
          oneProjectCreated = await request
            .post("/api/v1/postAnewProject")
            .field("tagsProject", tagsProject)
            .field("description", description)
            .field("nameProject", nameProject)
            .field("urlProject", urlProject)
            .attach("files", filePathImg)
            .attach("files", filePathImg2);
          break;
        case "false":
          oneProjectCreated = await request.post("/api/v1/postAnewProject").send(newProject);
          break;
      }
      expect(oneProjectCreated.status).to.eql(201);
      expect(oneProjectCreated.body).to.be.a("object");
      const catchAid = oneProjectCreated.body.ProjectsActualized;
      for (const el of catchAid) {
        idGenerate = el.id;
      }
    });
  });
  describe("GET A PROJECT BY ID", () => {
    it("Will respond with a object of a project", async () => {
      const oneProjects = await request.get(`/api/v1/getAProject/${idGenerate}`);
      expect(oneProjects.status).to.eql(200);
      expect(oneProjects.body).to.include.keys("nameProject", "tagsProject", "description", "imagesProject");
    });
  });
  describe("PUT A PROJECT", () => {
    it(" Respond  with a message modiefied:true and object modified", async () => {
      const newUpdateOneProject = generateUpdateOneProject();
      let modifiedAProject;
      switch (withS3) {
        case "true":
          modifiedAProject = await request
            .put(`/api/v1/modifiedAProject/${idGenerate}`)
            .field("tagsProject", tagsProject)
            .field("description", description)
            .field("nameProject", nameProject)
            .field("urlProject", urlProject)
            .attach("file", filePathImg)
            .attach("file", filePathImg2);
          break;
        case "false":
          modifiedAProject = await request.put(`/api/v1/modifiedAProject/${idGenerate}`).send(newUpdateOneProject);
          break;
      }
      expect(modifiedAproject.status).to.eql(200);
      expect(modifiedAproject.body).to.be.a("object");
      const elementModified = modifiedAproject.body.modifiedAproject;
      expect(elementModified).to.include.keys("nameProject", "tagsProject", "description", "imagesProject");
      expect(newUpdateOneProject.nameProject).to.eql(elementModified.nameProject);
      expect(newUpdateOneProject.description).to.eql(elementModified.description);
      //arrs
      for (let i = 0; i == elementModified.tagsProject.length; i++) {
        newUpdateOneProject.tagsProject.forEach((el) => {
          expect(el).to.eql(elementModified.tagsProject[i]);
        });
      }
      for (let i = 0; i == elementModified.imagesProject.length; i++) {
        newUpdateOneProject.imagesProject.forEach((el) => {
          expect(el).to.eql(elementModified.imagesProject[i]);
        });
      }
    });
  });
  describe("DELETE A  PROJECT", () => {
    it("Delete project and retun msge:true ", async () => {
      const deleteProject = await request.delete(`/api/v1/deleteAproject/${idGenerate}`);
      expect(deleteProject.status).to.eql(200);
      expect(deleteProject.body).to.deep.equal({ msge: true });
    });
  });
});
