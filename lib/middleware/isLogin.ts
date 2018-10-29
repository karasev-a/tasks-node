import UserService from "../models/user/service/user.service";
import { NextFunction, Request, Response } from "express";

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send({ auth: false, message: "No token provided." });
    }

    const payload = UserService.isAuth(token);
    if (payload) {
        req["roleId"] = payload.roleId;
        req["userId"] = payload.userId;
        next();
    } else {
        res.status(401).send({ auth: true, message: "wrong token." });
    }
};
