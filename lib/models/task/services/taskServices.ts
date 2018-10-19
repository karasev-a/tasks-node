import { Task, ITaskAttributes, Statuses } from "../task";
import { Op } from "sequelize";
import loggers from "tools/loggers";

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
        return  Number.isInteger(taskId)
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
        throw new Error("eeeeeee");
        return Task.findAll({
            where: {
                status: Statuses.Open,
            },
        });
    }

    public async getTasksByCat(catId) {
        return Task.findAll({
            where: {
                categoryId: catId,
            },
        });
    }

    public async increasSubPoeple(taskId) {
        const task =  await this.getOneTask(taskId);
        if ( task ) {
            task.dataValues.subscrebedPeople ++;
        }
        const result = await this.updateTask(taskId, task.dataValues);
        return  result;
    }

}
export default new TaskService();
