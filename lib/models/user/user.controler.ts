import { NextFunction, Request, Response, Router } from "express";
// import { apiErrorHandler } from '../handlers/errorHandler';
import UserService from "./service/user.service";
// import loggers from '../../tools/loggers';

export default class UserControler {
    // all
    public async getAll(req: Request, res: Response, next: NextFunction) {
        res.status(200).send(await UserService.getAll({ order: ["seqNo"] }));
    }

    // by Id
    public async getById(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id, 10);
        const user = await UserService.getById(userId);
        user ? res.status(200).send(user) : res.sendStatus(404);
    }

    // delete
    public async delete(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id, 10);
        const result = await UserService.delete(userId);
        result ? res.status(204).end() : res.status(404);
    }

    // Post
    public async createUser(req: Request, res: Response, next: NextFunction) {
        const model = req.body;
        const result = await UserService.create(model);
        res.status(201).send(result);
    }

     // Put
     public async updaeteUser(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id, 10);
        const model = req.body;
        res.status(200).send(await UserService.update(userId, model));
    }
}
