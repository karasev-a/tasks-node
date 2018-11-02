import taskService from "./services/taskServices";
import loggers from "../../tools/loggers";
import { ITaskAttributes, Roles } from "./task";
class TaskController {
    public async getAllTasks(req, res) {
        const paramsOfGet = taskService.getTaskAndParamsFromGetQuery(req.query);
        const task: ITaskAttributes = paramsOfGet.task;
        const otherParams = paramsOfGet.otherParams;
        const userId = parseInt(req.userId, 10);
        const result = await taskService.getAllTasks(task, otherParams, userId);
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
        task.userId = req.userId;
        const result = await taskService.createTask(task);
        global.logger.info(`Create task: ${JSON.stringify(task)}`);
        res.status(201).send(result);

    }

    public async updateTask(req, res) {
        const taskId = parseInt(req.params.taskId, 10);
        const task = req.body;
        task.userId = req.userId;
        let result;
        if (await taskService.isTaskOwner(taskId, task.userId)) {
            result = await taskService.updateTask(taskId, task);
        } else if (req.roleId === Roles.admin) {
            task.userId = taskService.getOneTask(taskId);
            result = await taskService.updateTask(taskId, task);
        } else {
            global.logger.info(`Update task: ${JSON.stringify(task)}`);
            res.status(403).send("You didn't have permission for edit this task").end();
        }
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
        const userId = req.userId;
        const result = await taskService.subscribeToTask(taskId, userId);
        if (result) {
            res.status(200).send(result);
            global.logger.info(`User subscribed to task`);
        } else {
            res.status(400).end();
            global.logger.error({ message: `User do not subscribed to task` });
        }

    }

    public async getAllTasksOfUser(req, res) {
        const result = await taskService.getAllTasksOfUser(req.userId);
        res.status(200).send(result);
        global.logger.info(JSON.stringify(result));
    }
    public async getOnReviewTasksOfManager(req, res) {
        const result = await taskService.getOnReviewTasksOfManager(req.userId);
        if (result.length > 0) {
            res.status(200).send(result);
            global.logger.info(JSON.stringify(`User subscribed to task ${result}`));
        } else {
            res.status(404).send("404: NotFound");
            global.logger.error({ message: `User do not have categories, where he is a manager` });
        }

    }
}

export default new TaskController();
