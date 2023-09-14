import aroundConfig from "../config/default.js";
import session from "express-session";
import client from "./redisConfig.js";
import RedisStore from "connect-redis";

let redisStore = new RedisStore({
  client: client,
  prefix: "sessionsBriefcase:",
});

export default session({
  store: redisStore,
  secret: aroundConfig.wordSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 21000000, //sesion 20 min
    httpOnly: false,
    sameSite: "none",
    secure: true,
  },
});
