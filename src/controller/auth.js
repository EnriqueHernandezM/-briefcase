//aqui importa,mops contenedoires
import logger from "../utils/loggers.js";
//aqui instanciamops new contenedor

async function getLogin(req, res, next) {
  try {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log("get login okk auth");
    } else {
      const toLog = { msge: "visit login to connect " };
      res.status(200).json(toLog);
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
      res.status(202).json({
        session: false,
        msge: "user not login",
      });
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
      res.status(202).json({
        session: false,
        msge: "Admin not Active",
      });
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
      res.status(202).json({
        session: false,
        msge: "user not login",
      });
    }
  } catch (err) {
    logger.log("error", `err_in_auth_post_sign_uo_admin:${err}`);
    next(err);
  }
}
function logOut(req, res, next) {
  try {
    let mdgDesp = "hasta luego" + " " + req.user.name;
    req.session.destroy((err) => {
      if (err) {
        res.status(503).send("algo salio mal en la pagina intenta de nuevo");
      } else {
        res.status(204).json({ msge: "sessio out ok", mdgDesp });
      }
    });
  } catch (err) {
    logger.log("error", `error in logout controller${err}`);
  }
}
export { getLogin, postLogin, getSignUpAdmin, postSignUpAdmin, logOut };
