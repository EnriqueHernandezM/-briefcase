import knexInstance from "./sqlite.js";
import logger from "../../../utils/loggers.js";
export default function createTablesSqlite() {
  knexInstance.schema.hasTable("projects").then(function (exists) {
    if (!exists) {
      knexInstance.schema
        .createTable("projects", (table) => {
          table.increments("id").primary(),
            table.string("nameProject").notNullable(),
            table.string("description").notNullable(),
            table.string("urlProject").notNullable(),
            table.datetime("created_at").defaultTo(knexInstance.fn.now());
        })
        .then(() => {
          logger.log("info", "✅The table for projects was successfully created");
          return knexInstance.schema.createTable("imagesProjects", (table) => {
            table.increments("idImages").primary(),
              table.string("imagesProject").notNullable(),
              table.integer("imagesId").references("id").inTable("projects");
          });
        })
        .then(() => {
          logger.log("info", "✅The table for imagesProject was successfully created");
          return knexInstance.schema.createTable("tagsProjects", (table) => {
            table.increments("idTags").primary(),
              table.string("tagsProject").notNullable(),
              table.integer("tagsId").references("id").inTable("projects");
          });
        })
        .then(() => {
          logger.log("info", "✅The table for tagsProjects was successfully created");
          return knexInstance.schema.createTable("index", (table) => {
            table.increments("id").primary(),
              table.string("name").notNullable(),
              table.string("urlAddres").notNullable(),
              table.datetime("created_at").defaultTo(new Date());
          });
        })
        .then(() => {
          logger.log("info", "✅The table for index was successfully created");
          return knexInstance.schema.createTable("admin", (table) => {
            table.increments("id").primary(),
              table.string("user").notNullable(),
              table.string("name").notNullable(),
              table.string("password").notNullable(),
              table.datetime("created_at").defaultTo(new Date());
          });
        })
        .then(() => {
          logger.log("info", "✅The table for admin was successfully created");
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err);
        })
        .finally(() => {
          logger.log("info", "✅all tables were created successfully");
        });
    }
  });
}
