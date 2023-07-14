import dotenv from "dotenv";
import jwtService from "jsonwebtoken";

dotenv.config();

const validateJWT = (req, res, next) => {
    const jwt = req.headers.authorization;
    const secretKey = process.env.SECRET_JWT;

        jwtService.verify(jwt, secretKey, (err, userData) => {
            if (err) {
                res.status(403).end();
                return;
            }

            res.locals.jwt = userData;
        });

    next();
};

export default validateJWT;