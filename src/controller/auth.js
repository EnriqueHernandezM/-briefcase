import logger from "../utils/loggers.js";

async function getLogin(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res.status(202).json({
        session: true,
        msge: "user login",
      });
    } else {
      const toLogMsge = { session: false, msge: "visit login to connect" };
      res.status(401).json(toLogMsge);
    }
  } catch (err) {
    logger.log("error", `err_in_auth_get_login:${err}`);
    next(err);
  }
}
async function postLogin(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res.status(202).json({
        session: true,
        msge: "user login",
      });
    } else {
      const toLogMsge = {
        session: false,
        msge: "user not login",
      };
      res.status(401).json(toLogMsge);
    }
  } catch (err) {
    logger.log("error", `err_in_auth_post_login:${err}`);
    next(err);
  }
}

async function getSignUpAdmin(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res.status(202).json({
        session: true,
        msge: "Admin Active",
      });
    } else {
      const toAdminMsge = {
        session: false,
        msge: "Admin not Active",
      };
      res.status(401).json(toAdminMsge);
    }
  } catch (err) {
    logger.log("error", `err_in_auth_get_sign_up_admin:${err}`);
    next(err);
  }
}
async function postSignUpAdmin(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res.status(202).json({
        session: true,
        msge: "Admin created",
      });
    } else {
      const toAdminMsge = { session: false, msge: "Admin not created" };
      res.status(401).json(toAdminMsge);
    }
  } catch (err) {
    logger.log("error", `err_in_auth_post_sign_uo_admin:${err}`);
    next(err);
  }
}
function logOut(req, res, next) {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(503).send("algo salio mal en la pagina intenta de nuevo");
      } else {
        res.status(204);
      }
    });
  } catch (err) {
    logger.log("error", `error in logout controller${err}`);
  }
}
export { getLogin, postLogin, getSignUpAdmin, postSignUpAdmin, logOut };
