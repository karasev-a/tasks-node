import { Task, ITaskAttributes, Statuses, ITaskInstance } from "../task";
import { Op } from "sequelize";
import loggers from "tools/loggers";
import { UsersTasks } from "../../users-tasks/usersTasks";
import { User } from "models/user/user";
import { Result } from "range-parser";

class TaskService {

    public async getAllTasks(task, otherParams) {

        let tasks: ITaskInstance[];
        if (otherParams.offset && otherParams.limit) {
            tasks = await Task.findAll({
                where: { ...task },
                limit: parseInt(otherParams.limit, 10),
                offset: parseInt(otherParams.offset, 10),
            });
        } else {
            tasks = await Task.findAll({
                where: { ...task },
            });
        }
        return tasks;
    }

    public async getOneTask(id: number) {
        return Task.findOne({
            where: {
                id,
            },
        });
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
        let otherParams = {};
        if (queryObj.limit && queryObj.offset) {
            otherParams = {
                limit: queryObj.limit,
                offset: queryObj.offset,
            };
            delete queryObj.limit;
            delete queryObj.offset;
        }
        task = queryObj;
        result = {
            task,
            otherParams,
        };
        return result;
    }

}
export default new TaskService();
