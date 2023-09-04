import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import aroundConfig from "./config/default.js";
import logger from "./utils/loggers.js";
const httpServer = http.createServer(app);
import createTablesSqlite from "./models/sqlite/options/createTableSqlite.js";
import fileUpload from "express-fileupload";
import passport from "passport";
import "./utils/passport/local-auth.js";
import session from "./utils/configSession.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import { index } from "./routers/router.js";
import { projects } from "./routers/router.js";
import { auth } from "./routers/router.js";
export default class InitServer {
  constructor() {
    this.PORT = aroundConfig.PORT || process.argv[2];
    this.app = app;
    this.httpServer = httpServer;
    this.session = session;
    this.notFound = notFound;
    this.errorHandler = errorHandler;
    this.creataTablesSqlite = createTablesSqlite;
    this.initDbs();
    this.middlewares();
    this.routes();
  }
  initDbs() {
    this.creataTablesSqlite();
  }

  middlewares() {
    this.app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200, credentials: true }));
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.session);
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
  routes() {
    this.app.use("/api_briefcase", index);
    this.app.use("/api_briefcase/v1", projects);
    this.app.use("/api_briefcase/v1", auth);
    this.app.use(this.notFound);
    this.app.use(this.errorHandler);
  }
  listen() {
    httpServer.listen(this.PORT, () => logger.log("info", `✅ Server on http://localhost:${this.PORT}`));
  }
}
