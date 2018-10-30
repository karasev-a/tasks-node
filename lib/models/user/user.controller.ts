import { NextFunction, Request, Response, Router } from "express";
import UserService from "./service/user.service";

class UserController {
    // all
    public async getAll(req: Request, res: Response, next: NextFunction) {
        res.status(200).send(await UserService.getAll());
    }

    // by Id
    public async getById(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.userId, 10);
        const user = await UserService.getById(userId);
        user ? res.status(200).send(user) : res.sendStatus(404);
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
     public async update(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.userId, 10);
        const model = req.body;
        res.status(200).send(await UserService.update(userId, model));
    }
}

export default new UserController();
