import { Router } from "express";
import passport from "passport";
import { getLogin, postLogin, getSignUpAdmin, postSignUpAdmin, logOut } from "../controller/auth.js";
const auth = new Router();

auth.get("/login", getLogin);
auth.get("/signUpAdmin", getSignUpAdmin);
auth.get("/logOut", logOut);
auth.post("/login", passport.authenticate("login", { passReqToCallback: true, failureRedirect: "/api/V1/login" }), postLogin);
auth.post(
  "/signUpAdmin",
  passport.authenticate("createAdmin", { passReqToCallback: true, failureRedirect: "/api/V1/signUpAdmin" }),
  postSignUpAdmin
);

export { auth };
