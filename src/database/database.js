import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
const attempt = await mongoClient.connect();
const db = mongoClient.db();
if (attempt) {
  console.log("Banco Conectado!");
} else {
  console.log("Erro ao conectar ao Banco... :(");
}

export default db;
