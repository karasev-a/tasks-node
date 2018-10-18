import taskService from "./services/taskServices";
import loggers from "../../tools/loggers";
class TaskController {
    public async getAllTasks(req, res) {
        const result = await taskService.getAllTasks();
        res.status(200).send(result);
        global.logger.info(result);
    }

    public async getOneTask(req, res, next) {
        const userId = parseInt(req.params.taskId, 10);
        const task = await taskService.getOneTask(userId);
        if (task) {
            res.status(200).send(task);
        } else {
            res.sendStatus(404);
        }
    }

    public async deleteTask(req, res) {
        const taskId = parseInt(req.params.taskId, 10);
        const result = await taskService.deleteTaskById(taskId);
        result ? res.sendStatus(204) : res.sendStatus(404);
    }

    public async createNewTask(req, res) {
        const task = req.body;
        const result = await taskService.createTask(task);
        global.logger.info(`Create task: ${task}`);
        res.status(201).send(result);

    }

    public async updateTask(req, res) {
        const taskId = parseInt(req.params.taskId, 10);
        const task = req.body;
        const result = await taskService.updateTask(taskId, task);
        global.logger.info(`Update task: ${task}`);
        res.status(200).send(result);
    }

    public async getOpenTasks(req, res) {
        const result = await taskService.getOpenTasks();
        res.status(200).send(result);
        global.logger.info(`Get open tasks`);
    }

    public async getTasksByCat(req, res) {
        const catId = parseInt(req.params.catId, 10);
        const result = await taskService.getTasksByCat(catId);
        res.status(200).send(result);
        global.logger.info(`Get tasks by category`);
    }

    public async increaseSubPeople(req, res) {
        const taslId = parseInt(req.params.taskId, 10);
        const result = await taskService.increasSubPoeple(taslId);
        res.status(200).send(result);
        global.logger.info(`Get tasks by category`);
    }
}

export default new TaskController();
