import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import loginSchema from "../schemas/login.schema.js";
import signUpSchema from "../schemas/signUp.schema.js";
import {
  handleLogOut,
  handleLogin,
  handleSignUp,
} from "../controllers/auth.controllers.js";
import validateCredencials from "../middlewares/validateCredencials.middleware.js";
import generateJWT from "../middlewares/generateJWT.middleware.js";
import validateJWT from "../middlewares/validateJWT.middleware.js";

const authRouter = Router();

authRouter.post(
  "/login",
  validateSchema(loginSchema),
  validateCredencials,
  generateJWT,
  handleLogin
);
authRouter.post("/signup", validateSchema(signUpSchema), handleSignUp);
authRouter.post("/logout", validateJWT, handleLogOut);

export default authRouter;
