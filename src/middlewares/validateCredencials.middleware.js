import bcrypt from "bcrypt";
import db from "../database/database.js";

const validateCredencials = async (req, res, next) => {
  const { email, password } = req.body;

  const message = "Verifique os dados informados!";

  const userRegister = await db.collection("user").findOne({ email });
  const validatePassword = bcrypt.compareSync(password, userRegister.password);
  if (!userRegister || !validatePassword) return res.status(401).send(message);

  const logged = await db.collection("session").findOne({ email });
  if (logged) return res.status(409).send("Já está em sessão!");

  next();
};

export default validateCredencials;
