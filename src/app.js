import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.routes.js";
import jwt from "jsonwebtoken";
import db from "./database/database.js";

const app = express();

app.use(cors());
app.use(json());
dotenv.config();

app.use(routes);

app.listen(process.env.PORT, () =>
  console.log(`Servidor online: PORT: ${process.env.PORT}`)
);
