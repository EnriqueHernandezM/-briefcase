import { Router } from "express";
import { getIndex, postRoute, deleteRout } from "../controller/index.js";
import { checkAuthentication } from "../middleware/admin.middleware.js";
const index = new Router();

index.get("/v1", getIndex);
index.post("/v1", checkAuthentication, postRoute);
index.delete("/v1", checkAuthentication, deleteRout);
export { index };
