import aroundConfig from "../config/default.js";
import session from "express-session";
//aroundConfig.WORD_SECRET;

export default session({
  secret: aroundConfig.WORD_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000, //sesion 10 min
  },
});
