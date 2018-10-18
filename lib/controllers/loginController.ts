import UserService from "../models/user/service/user.service";
import { NextFunction, Request, Response } from "express";
// import { User } from "models/user/user";
// import {TE} from "../tools/error";

class LoginController {
    // Post
    public async login(req: Request, res: Response, next: NextFunction) {
        const credentials = req.body;
        let user;
        try {
            user = await UserService.checkCredentials(credentials);
        } catch (err) {
            if (err.original) {
                res.status(err.status).send(`${err.message}: ${err.original.message}`);
            } else {
                res.status(err.status).send(`${err.message}`);
            }
        }
        let tokenValue;
        if (user) {
            tokenValue = await UserService.auth(user).catch((err) => {
                // some error
            });
            tokenValue ? res.status(201).send({ token: tokenValue }) : res.sendStatus(404);
        }
    }

    //
    public async islogin(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["x-access-token"]; // #TODO: need parce
        if (!token) {
            return res.status(401).send({ auth: false, message: "No token provided." });
        }

        if (UserService.isAuth(token)) {
            res.status(200).send({ auth: true, message: "authenticate token." });
        } else {
            res.status(401).send({ auth: true, message: "wrong token." });
        }
        next();
    }
}

export default new LoginController();
