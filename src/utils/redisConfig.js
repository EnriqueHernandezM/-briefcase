import aroundConfig from "../config/default.js";
import logger from "../utils/loggers.js";

import { createClient } from "redis";

const client = createClient({
  password: aroundConfig.passwordRedisLab,
  socket: {
    host: aroundConfig.hostRedisLab,
    port: aroundConfig.portRedisLab,
  },
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect().then(logger.log("info", `✅connected to redis for sessions`)).catch(console.error);

export default client;
