import aroundConfig from "../config/default.js";
import supertest from "supertest";
const request = supertest(`http://localhost:${aroundConfig.PORT}`);
import { expect } from "chai";
import { faker } from "@faker-js/faker";

describe("test Api", () => {
  describe("GET ALL ROUTES", () => {
    it("deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/v1");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
      //   expect(res.body).to.eql({ version: '0.0.1' });
    });
  });
});
