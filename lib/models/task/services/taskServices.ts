import { Task, ITaskAttributes, Statuses } from "../task";
import { Op } from "sequelize";
import loggers from "tools/loggers";
import { UsersTasks } from "../../users-tasks/usersTasks";
import { User } from "models/user/user";
import { Result } from "range-parser";

class TaskService {

    public async getAllTasks(req) {

        const limit = 1;   // number of records per page
        let offset = 0;
        const countRows = await Task.findAndCountAll({
            where: { ...req.query },
        });
        const page = req.params.page;      // page number
        const pages = Math.ceil(countRows.count / limit);
        offset = limit * (page - 1);
        const tasks = await Task.findAll({
            where: { ...req.query },
            limit,
            offset,
            // $sort: { id: 1 }
        });
        const result = {
            tasks,
            count: countRows.count,
            pages,
        };
        return result;

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

}
export default new TaskService();
