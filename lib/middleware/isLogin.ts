import UserService from "../models/user/service/user.service";
import { NextFunction, Request, Response } from "express";

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
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
};
