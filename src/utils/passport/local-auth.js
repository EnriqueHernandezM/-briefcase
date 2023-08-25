import passport from "passport";
import LocalS from "passport-local";
const LocalStrategy = LocalS.Strategy;
import bcrypt from "bcrypt";
import logger from "../loggers.js";
import ContainerAuth from "../../services/auth.js";
const containerAuth = new ContainerAuth();
///////

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  containerAuth.getInfoUserToDeserialized(id, done);
});

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "createAdmin",
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, name, password, done) => {
      if (req.query.params) {
      }
      containerAuth.getInfoUser(null, name, (err, user) => {
        if (err) {
          logger.log("info", "Error in SignUp: " + err);
          return done(err);
        }
        if (user) {
          logger.log("info", "User already exists");
          return done(null, false);
        }
        const newUser = {
          user: "admin",
          name: name,
          password: createHash(password),
        };
        containerAuth.addOneAdmin(newUser, (err, userWithId) => {
          if (err) {
            logger.log("info", `Error in Saving user:${err}`);
            return done(err);
          }
          logger.log("info", "User Registration succesful");
          return done(null, ...userWithId);
        });
      });
    }
  )
);

//////ESTRATEGIA LOGIN
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, name, password, done) => {
      containerAuth.getInfoUser(null, name, (err, user) => {
        if (err) return done(err);
        if (!user) {
          logger.log("info", `User Not Found with name  ${name}`);
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          logger.log("info", "Invalid Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
