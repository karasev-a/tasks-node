import { Task, ITask} from "../task";

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

    public async updateTask(taskId: number, task: ITask) {
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

    public async createTask(task: ITask) {
        if (task) {
            return Task.create(task);
        }
    }

}
export default new TaskService();
