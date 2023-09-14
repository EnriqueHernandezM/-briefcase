import aroundConfig from "../config/default.js";
import logger from "../utils/loggers.js";
const isAdmin = (req, res, next) => {
  const { pinAdmin } = req.query;
  if (pinAdmin != aroundConfig.pinAdmin || !pinAdmin) {
    logger.log("error", "your admin password is missing as query parameter");
    const errorPin = new Error("your admin PIN is missing as query parameter");
    next(errorPin);
  } else if (pinAdmin === aroundConfig.pinAdmin) {
    next();
  }
};
const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    res.status(401).json({ session: false, msge: "go to login" });
  }
};

export { isAdmin, checkAuthentication };
