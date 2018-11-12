import { Task, ITaskAttributes, Statuses, ITaskInstance } from "../task";
import * as sequelize from "sequelize";
import loggers from "tools/loggers";
import { UsersTasks } from "../../users-tasks/usersTasks";
import { UsersCategories } from "../../users-categories/usersCategories";
import { Category } from "../../category/category";
import { User } from "../../user/user";

const Op = sequelize.Op;

class TaskService {

    public async getAllTasks(task, otherParams, userIdParam) {
        let tasks: ITaskInstance[];
        const arrayOfTaskId = await this.getArraySubscribedTaskIdOfUser(userIdParam);
        const queryParamsToDB: any = {
            subQuery: false,
            where: {
                ...task,
                id: {
                    [sequelize.Op.notIn]: arrayOfTaskId,
                },
                userId: {
                    [sequelize.Op.ne]: userIdParam,
                },
            },
            include: [{
                model: UsersTasks,
                attributes: [],
            }],
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("UsersTasks.userId")), "numberSubscribedPeople"]],
            },
            group: ["Task.id"],
        };

        if (otherParams.offset) {
            queryParamsToDB.offset = parseInt(otherParams.offset, 10);
        }
        if (otherParams.limit) {
            queryParamsToDB.limit = parseInt(otherParams.limit, 10);
        }
        tasks = await Task.findAll(queryParamsToDB);
        return tasks;
    }

    public async getAllTasksOfUser(task, otherParams, userId, arrayCategoryIdFromGet) {
        let tasks: ITaskInstance[];
        if (task.title) {
            task.title = {
                [Op.like]: (`%${task.title}%`),
            };
        }
        if (otherParams.dateStart && otherParams.dateEnd) {
            const dateS = new Date(otherParams.dateStart);
            const dateE = new Date(otherParams.dateEnd);
            task.date = {
                [Op.between]: [dateS, dateE],
            };
        }
        if (task.categoryId) {
            task.categoryId = {
                [sequelize.Op.in]: arrayCategoryIdFromGet,
            };
        }
        const queryParamsToDB: any = {
            subQuery: false,
            order: [["createdAt", "DESC"]],
            where: {
                ...task,
                userId,
            },
            include: [
                {
                    model: UsersTasks,
                    attributes: [],
                },
                {
                    model: Category,
                    attributes: ["name"],
                },
            ],
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("UsersTasks.userId")), "numberSubscribedPeople"]],
            },
            group: ["Task.id"],
        };
        if (otherParams.offset) {
            queryParamsToDB.offset = parseInt(otherParams.offset, 10);
        }
        if (otherParams.limit) {
            queryParamsToDB.limit = parseInt(otherParams.limit, 10);
        }

        tasks = await Task.findAll(queryParamsToDB);
        return tasks;
    }

    public async getOnReviewTasksOfManager(userId, arrayCategoryIdFromGet) {
        const arrayOfCategoryId = await this.getArrayOfCategoryIdOfManager(userId);

        let result: number[];

        if (arrayCategoryIdFromGet && arrayCategoryIdFromGet.length > 0) {
            result = arrayCategoryIdFromGet;
        } else {
            result = arrayOfCategoryId;
        }

        return Task.findAll({
            where: {
                categoryId: {
                    [sequelize.Op.in]: result,
                },
                status: Statuses.OnReview,
            },
            include: [
                {
                    model: User,
                    attributes: [],
                },
                {
                    model: Category,
                    attributes: ["name"],
                },
            ],
            attributes: {
                // include: [[sequelize.fn("COUNT", sequelize.col("UsersTasks.userId")), "numberSubscribedPeople"]],
                include: [
                    [sequelize.fn("concat", sequelize.col("firstname"), " ", sequelize.col("lastname")), "firstLastName"],
                ],
            },
        });
    }

    public async getOneTask(id: number) {
        const task = Task.findOne({
            where: {
                id,
            },
        });
        return task;
    }

    public async deleteTaskById(id) {

        return Number.isInteger(id)
            ? Task.destroy({
                where: {
                    id,
                },
            })
            : null;
    }

    public async updateTask(id: number, task: ITaskAttributes) {
        if (task && Number.isInteger(id)) {
            delete task.id;
            const result = await Task.update(task, {
                where: {
                    id,
                },
            });
            return result;
        }
    }

    public async createTask(task: ITaskAttributes) {
        if (task) {
            return Task.create(task);
        }
    }

    public async getOpenTasks() {
        return Task.findAll({
            where: {
                status: Statuses.Open,
            },
        });
    }

    public async getTasksByCategory(categoryId) {
        return Task.findAll({
            where: {
                categoryId,
            },
        });
    }

    public async subscribeToTask(taskId, userId) {
        const subscribedUser = await UsersTasks.findOne({
            where: {
                userId,
                taskId,
            },
        });

        if (!subscribedUser) {
            const task = await Task.findById(taskId);
            const tasksInUT = await UsersTasks.findAndCountAll({
                where: {
                    taskId,
                },
            });

            if (tasksInUT.count < task.dataValues.people) {
                return await UsersTasks.create({
                    userId,
                    taskId,
                });
            }
        }

    }

    public getTaskAndParamsFromGetQuery(queryObj) {
        let result;
        let task: ITaskAttributes;
        const otherParams = {
            limit: 0,
            offset: 0,
        };
        if (queryObj.limit) {
            otherParams.limit = queryObj.limit;
            delete queryObj.limit;
        }
        if (queryObj.offset) {
            otherParams.offset = queryObj.offset;
            delete queryObj.offset;
        }
        if (queryObj.dateStart) {
            otherParams['dateStart'] = queryObj.dateStart;
            delete queryObj.dateStart;
        }
        if (queryObj.dateEnd) {
            otherParams['dateEnd'] = queryObj.dateEnd;
            delete queryObj.dateEnd;
        }
        task = queryObj;
        result = {
            task,
            otherParams,
        };
        return result;
    }

    public async isTaskOwner(taskId, userId) {
        const res = await this.getOneTask(taskId) as ITaskAttributes;
        return res.userId === userId;
    }

    public async getArraySubscribedTaskIdOfUser(userId) {
        const subscribedTaskOfUser = await UsersTasks.findAll({
            where: {
                userId,
            },
        });

        const arrayOfTaskId: number[] = subscribedTaskOfUser.map((el) => el.dataValues.taskId);
        return arrayOfTaskId;
    }

    public async getArrayOfCategoryIdOfManager(userId) {
        const categoriesOfManager = await UsersCategories.findAll({
            where: {
                userId,
            },
        });

        const arrayOfCategortId = categoriesOfManager.map((el) => el.dataValues.categoryId);
        return arrayOfCategortId;
    }

}
export default new TaskService();
