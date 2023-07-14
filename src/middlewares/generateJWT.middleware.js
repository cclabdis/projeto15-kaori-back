import dotenv from "dotenv";
import db from "../database/database.js";
import jwt from "jsonwebtoken";

dotenv.config();

const generateJWT = async (req, res, next) => {
    const { email } = req.body;

    const userData = await db.collection("user").findOne({ email });

    if(userData){
        
        const secretKey = process.env.SECRET_JWT;

        jwt.sign(userData, secretKey, (err, token) => {
            if (err) {
                res
                    .status(500)
                    .json({ mensagem: "Erro ao gerar o JWT" });

                return;
            }
            
            res.set("jwt", token);
        });
    } else {
        res.status(401);
        res.end();
    }

    next();
};

export default generateJWT;