import UserService from "../models/user/service/user.service";
import { NextFunction, Request, Response } from "express";
import { Roles } from "../models/task/task";
import loggers from "../tools/loggers";

export const checkAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    const payload = UserService.isAuth(token);
    if (payload) {
        if (payload.roleId === Roles.admin) {
            next();
        } else {
            global.logger.info(`User is not admin`);
            res.status(403).send("You doesn't have permission.").end();
        }
    } else {
        res.status(401).send({ auth: true, message: "wrong token." });
    }
};

export const checkManagerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const payload = UserService.isAuth(token);
    if (payload) {
        if ((payload.roleId === Roles.admin) || (payload.roleId === Roles.manager) ) {
            next();
        } else {
            global.logger.info(`User is not manager or admin`);
            res.status(403).send("You doesn't have permission.").end();
        }
    } else {
        res.status(401).send({ auth: true, message: "wrong token." });
    }

};
