import { NextFunction, Request, Response, Router } from "express";
import UserService from "./service/user.service";
import { IUserAttributes } from "./user";

class UserController {
    // get all
    public async getAll(req, res: Response, next: NextFunction) {
            res.status(200).send(await UserService.getAll());
    }

    // by Id
    public async getById(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.userId, 10);
        const user = await UserService.getById(userId);
        user ? res.status(200).send(user) : res.sendStatus(404);
    }
    public async getProfileData(req, res: Response, next: NextFunction) {
        res.status(200).send(await UserService.getById(parseInt(req.userId, 10)));
    }

    // delete
    public async delete(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.userId, 10);
        const result = await UserService.delete(userId);
        result ? res.status(204).end() : res.status(404);
    }

    // Post
    public async create(req: Request, res: Response, next: NextFunction) {
        const model = req.body;
        const result = await UserService.create(model).catch((err) => {
            if (err.original) {
                res.status(400).send(`${err.message}: ${err.original.message}`);
            } else {
                res.status(400).send(`${err.message}`);
            }
        });
        res.status(201).send(result);
    }

     // Put
     public async update(req, res: Response, next: NextFunction) {
        let userId;
        const model = req.body;
        // check is it have id in parametr it is meaning that it is admin
        if (req.params.userId) {
            userId = parseInt(req.params.userId, 10);
        } else { // this is just user, trying update profile
            userId = parseInt(req.userId, 10);
            // check if it try to change password
            if (model.oldPswd) {
                const currentUSer = await UserService.getById(userId);
                // password equal
                if (UserService.isSamePassword(model.oldPswd, currentUSer.dataValues.password)) {
                    model.password = UserService.bcryptPassword(model.newPswd);
                    delete model.oldPswd;
                    delete model.newPswd;
                } else {
                    res.status(400).send("old password wrong").end();
                }
            }
        }
        res.status(200).send(await UserService.update(userId, model));
    }

    public async getAllWithStatistic(req, res) {
        const result = await UserService.getAllWithStatistic(req.userId);
        res.status(200).send(result);
    }
}

export default new UserController();
