import { Task, ITaskAttributes, Statuses } from "../task";
import { Op } from "sequelize";
import loggers from "tools/loggers";
import { UsersTasks } from "../../users-tasks/usersTasks";
import { User } from "models/user/user";

class TaskService {

    public async getAllTasks() {
        return Task.findAll();
    }

    public async getOneTask(taskId: number) {
        return Task.findOne({
            where: {
                id: taskId,
            },
        });
    }

    public async deleteTaskById(taskId: number) {
        return Number.isInteger(taskId)
            ? Task.destroy({
                where: {
                    id: taskId,
                },
            })
            : null;
    }

    public async updateTask(taskId: number, task: ITaskAttributes) {
        if (task && Number.isInteger(taskId)) {
            delete task.id;
            const result = await Task.update(task, {
                where: {
                    id: taskId,
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

    public async getTasksByCategory(catId) {
        return Task.findAll({
            where: {
                categoryId: catId,
            },
        });
    }

    public async subscribeToTask(taskIdParam, userIdParam) {
        const subscribedUser = await UsersTasks.findOne({
            where: {
                userId: userIdParam,
            },
        });

        if (!subscribedUser) {
            const task = await Task.findById(taskIdParam);
            const tasksInUT = await UsersTasks.findAndCountAll({
                where: {
                    taskId: taskIdParam,
                },
            });

            if (tasksInUT.count < task.dataValues.people) {
                return await UsersTasks.create({
                    userId: userIdParam,
                    taskId: taskIdParam,
                });
            }
        }

    }

}
export default new TaskService();
