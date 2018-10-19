import taskService from "./services/taskServices";
import loggers from "../../tools/loggers";
class TaskController {
    public async getAllTasks(req, res) {
        const result = await taskService.getAllTasks();
        res.status(200).send(result);
        global.logger.info(JSON.stringify(result));
    }

    public async getOneTask(req, res) {
        const taskId = parseInt(req.params.taskId, 10);
        const task = await taskService.getOneTask(taskId);
        if (task) {
            res.status(200).send(task);
            global.logger.info("Get task by Id");
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
        global.logger.info(`Create task: ${JSON.stringify(task)}`);
        res.status(201).send(result);

    }

    public async updateTask(req, res) {
        const taskId = parseInt(req.params.taskId, 10);
        const task = req.body;
        const result = await taskService.updateTask(taskId, task);
        global.logger.info(`Update task: ${JSON.stringify(task)}`);
        res.status(200).send(result);
    }

    public async getOpenTasks(req, res) {
        try {
            const result = await taskService.getOpenTasks();
            res.status(200).send(result);
            global.logger.info(`Get open tasks`);
        } catch (error) {
            global.logger.error(error);
        }
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
