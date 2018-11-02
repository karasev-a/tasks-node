import { Task, ITaskAttributes, Statuses, ITaskInstance } from "../task";
import * as sequelize from "sequelize";
import loggers from "tools/loggers";
import { UsersTasks } from "../../users-tasks/usersTasks";

class TaskService {

    public async getAllTasks(task, otherParams) {

        let tasks: ITaskInstance[];
        const queryParamsToDB: any = {
            subQuery: false,
            where: { ...task },
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
}
export default new TaskService();
