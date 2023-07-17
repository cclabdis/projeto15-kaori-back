import bcrypt from "bcrypt";
import db from "../database/database.js";

export const handleLogin = async (req, res) => {
  delete req.body.password;
  const sessionData = { ...req.body, time: Date.now() };
  await db.collection("session").insertOne(sessionData);

  res.status(200).send({sessionData});
};

export const handleSignUp = async (req, res) => {
  const { email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const alreadySigned = await db.collection("user").findOne({ email });
    if (alreadySigned)
      return res.status(409).send("Este endereço de email já foi cadastrado!");
    await db
      .collection("user")
      .insertOne({ ...req.body, password: hashPassword });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const handleLogOut = async (req, res) => {
  const email = res.locals.jwt.email;

  try {
    const logout = await db.collection("session").deleteOne({ email });
    if(logout.deletedCount === 0) return res.sendStatus(404);
    res.status(201).send("Obrigado! Volte sempre!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
