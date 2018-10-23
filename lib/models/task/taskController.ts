import taskService from "./services/taskServices";
import loggers from "../../tools/loggers";
class TaskController {
    public async getAllTasks(req, res) {
        const result = await taskService.getAllTasks(req);
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

    public async getTasksByCategory(req, res) {
        const categoryId = parseInt(req.params.categoryId, 10);
        const result = await taskService.getTasksByCategory(categoryId);
        res.status(200).send(result);
        global.logger.info(`Get tasks by category`);
    }

    public async subscribeToTask(req, res) {
        const taskId = parseInt(req.params.taskId, 10);
        const userId = parseInt(req.params.userId, 10);
        const result = await taskService.subscribeToTask(taskId, userId);
        if (result) {
            res.status(200).send(result);
            global.logger.info(`User subscribed to task`);
        } else {
            res.status(400).end();
            global.logger.error({message: `User do not subscribed to task`});
        }

    }
}

export default new TaskController();
