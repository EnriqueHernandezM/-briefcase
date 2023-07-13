import aroundConfig from "../config/default.js";
import supertest from "supertest";
const request = supertest(`http://localhost:${aroundConfig.PORT}`);
import { expect } from "chai";
import { faker } from "@faker-js/faker";
let idGenerate;
const generateUrl = () => {
  return { name: faker.word.adjective(), urlAddres: faker.lorem.paragraph() };
};

describe("test Api", () => {
  describe("GET ALL ROUTES", () => {
    it("should respond with status 200 and be an array", async () => {
      const res = await request.get("/api/v1");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("object");
      //   expect(res.body).to.eql({ version: '0.0.1' });
    });
  });
  describe("POST NEW ROUT", () => {
    it("should respond with an array inside an object", async () => {
      const newUrl = generateUrl();
      const res = await request.post("/api/v1").send(newUrl);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("succes", "newRout");
      let largeItem = res.body.newRout;
      for (const iD of largeItem) {
        idGenerate = iD.id;
      }
    });
  });
  describe("DELETE ROUT", () => {
    it("Delet rout created and return msge:true", async () => {
      const res = await request.delete(`/api/v1/?deleteRoutId=${idGenerate}`);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("object");
      expect(res.body).to.deep.equal({ msge: true });
    });
  });
});
