import UserService from "../models/user/service/user.service";
import { NextFunction, Request, Response } from "express";
import { User } from "models/user/user";

class LoginController {
    // Post
    public async login(req: Request, res: Response, next: NextFunction) {
        const credentials = req.body;
        const user = await UserService.checkCredentials(credentials).catch( (e) => {
            res.sendStatus(401); // TODO: fix error parsing, now error with wrong password return only bcrypt
        });

        if ((user as Error).name) {
            res.sendStatus(parseInt(((user as Error).name), 10));
        }
        const token = await UserService.auth(user);
        token ? res.status(201).send(token) : res.sendStatus(404);
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
    }
}

export default new LoginController();
