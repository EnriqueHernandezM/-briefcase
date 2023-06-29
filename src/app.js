import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import aroundConfig from "./config/default.js";
import logger from "./utils/loggers.js";
const httpServer = http.createServer(app);
/////de esto borrar creo spolo =usarermos uno
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import { index } from "./routers/router.js";
export default class InitServer {
  constructor() {
    this.PORT = aroundConfig.PORT || process.argv[2];
    this.app = app;
    this.httpServer = httpServer;
    //this.session = session;
    this.notFound = notFound;
    this.errorHandler = errorHandler;
    this.initDbs();
    this.auth();
    this.middlewares();
    this.routes();
  }
  initDbs() {}
  auth() {}
  middlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    //    this.app.use(this.session)
  }
  routes() {
    this.app.use("/api", index);
    this.app.use(this.notFound);
    this.app.use(this.errorHandler);
  }
  listen() {
    httpServer.listen(this.PORT, () => logger.log("info", `✅ Server on http://localhost:${this.PORT}`));
  }
}
