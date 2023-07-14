import { Router } from "express";
import authRouter from "./auth.routes.js";


const routes = Router();

routes.use(authRouter);


export default routes;