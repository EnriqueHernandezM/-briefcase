import aroundConfig from "../config/default.js";
import supertest from "supertest";
const request = supertest(`http://localhost:${aroundConfig.PORT}`);
import { expect } from "chai";
import { faker } from "@faker-js/faker";
let idGenetate;

const generateOneProject = () => {
  return {
    nameProject: faker.lorem.words(3),
    tagsProject: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    description: faker.lorem.words(10),
    imagesProject: [faker.image.url(), faker.image.url(), faker.image.url()],
    urlProject: faker.internet.url(),
  };
};

const generateUpdateOneProject = () => {
  return {
    nameProject: faker.lorem.words(3),
    tagsProject: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    description: faker.lorem.words(20),
    imagesProject: [faker.image.url(), faker.image.url(), faker.image.url(), faker.image.url()],
    urlProject: faker.internet.url(),
  };
};

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
      const oneProjectCeted = await request.post("/api/v1/postAnewProject").send(newProject);
      expect(oneProjectCeted.status).to.eql(201);
      expect(oneProjectCeted.body).to.be.a("object");
      const catchAid = oneProjectCeted.body.ProjectsActualized;
      for (const el of catchAid) {
        idGenetate = el.id;
      }
    });
  });
  describe("GET A PROJECT BY ID", () => {
    it("Will respond with a object of a project", async () => {
      const oneProjects = await request.get(`/api/v1/getAProject/${idGenetate}`);
      expect(oneProjects.status).to.eql(200);
      expect(oneProjects.body).to.include.keys("nameProject", "tagsProject", "description", "imagesProject");
    });
  });
  describe("PUT A PROJECT", () => {
    it(" Respond  with a message modiefied:true and object modified", async () => {
      const newUpdateOneProject = generateUpdateOneProject();
      const modifiedAproject = await request.put(`/api/v1/modifiedAProject/${idGenetate}`).send(newUpdateOneProject);
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
      const deleteProject = await request.delete(`/api/v1/deleteAproject/${idGenetate}`);
      expect(deleteProject.status).to.eql(200);
      expect(deleteProject.body).to.deep.equal({ msge: true });
    });
  });
});
