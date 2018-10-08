import { NextFunction, Request, Response, Router } from 'express';
// import { apiErrorHandler } from '../handlers/errorHandler';
import UserService from './service/user.service';
// import loggers from '../../tools/loggers';

export default class UserControler {
    constructor() { }

    // all
    public async getAll(req: Request, res: Response, next: NextFunction) {
        UserService.getAll({ order: ['seqNo'] }) // should we use option
            .then(result => res.json(result))
            .catch(err => {
                //   logger.info(err, req, res, 'Fetch All Users failed.')
            });
    }

    // by Id
    public async getById(req: Request, res: Response, next: NextFunction) {
        UserService.getById(req.params.id)
            .then(result => res.json(result))
            .catch(err => {
                //   logger.info(err, req, res, 'get by id User failed.')
        });
    }

    // getLessonById(req: Request, res: any, next: NextFunction) {
    //     UserService.getLessonById(req.params.id)
    //         .then(result => {
    //             if (result) {
    //                 return res.json(result);
    //             } else {
    //                 res.status(404).send(`Lesson ${req.params.id} not found.`);
    //             }
    //         })
    //         .catch(err => {
    //             apiErrorHandler(err, req, res, `Lesson ${req.params.id} failed.`);
    //         });
    // }

    // createLesson(req: Request, res: Response, next: NextFunction) {
    //     UserService.createLesson(req['value']['body'])
    //         .then(result => res.json(result))
    //         .catch(err => {
    //             apiErrorHandler(err, req, res, 'Creation of Lesson failed.');
    //         });
    // }

    // updateLesson(req: Request, res: Response, next: NextFunction) {
    //     UserService.updateLesson(req.params.id, req['value']['body'])
    //         .then(result => res.json(result))
    //         .catch(err => {
    //             apiErrorHandler(
    //                 err,
    //                 req,
    //                 res,
    //                 `updation of Lesson ${req.params.id} is failed.`
    //             );
    //         });
    // }

    // deleteLesson(req: Request, res: Response, next: NextFunction) {
    //     UserService.deleteLesson(req.params.id)
    //         .then(result => res.json(result))
    //         .catch(err => {
    //             apiErrorHandler(
    //                 err,
    //                 req,
    //                 res,
    //                 `deletion of Lesson ${req.params.id}  is failed.`
    //             );
    //         });
    // }
}