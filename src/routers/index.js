import { Router } from "express";
import { getIndex, postRoute, deleteRout } from "../controller/index.js";
const index = new Router();

index.get("/v1", getIndex);
index.post("/v1", postRoute);
index.delete("/v1", deleteRout);
export { index };
