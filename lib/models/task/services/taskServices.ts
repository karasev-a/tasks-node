import Task from "../task";

class TaskService {

    public async getAllTasks() {
        return Task.findAll();
    }

    public async getOneTask(taskId) {
        return Task.findOne({
            where: {
                id: taskId,
            },
        });
    }

    public async deleteTaskById(taskId) {
        return Task;
    }

    public async updateTask(taskId, task) {
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

    public async createTask(task) {
        if (task) {
            return Task.create(task);
        }
    }

}
export default new TaskService();
