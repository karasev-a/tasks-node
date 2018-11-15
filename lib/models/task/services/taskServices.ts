import { Task, ITaskAttributes, Statuses, ITaskInstance, Roles } from "../task";
import * as sequelize from "sequelize";
import loggers from "tools/loggers";
import { UsersTasks } from "../../users-tasks/usersTasks";
import { UsersCategories } from "../../users-categories/usersCategories";
import { Category } from "../../category/category";
import { all } from "bluebird";
import { User } from "../../user/user";

const Op = sequelize.Op;

class TaskService {

    public async getAllTasks(task, otherParams, userIdParam) {
        let tasks: ITaskInstance[];
        const arrayOfTaskId = await this.getArraySubscribedTaskIdOfUser(userIdParam);
        const queryParamsToDB: any = {
            subQuery: false,
            where: {
                ...task,
                id: {
                    [sequelize.Op.notIn]: arrayOfTaskId,
                },
                userId: {
                    [sequelize.Op.ne]: userIdParam,
                },
            },
            include: [{
                model: UsersTasks,
                attributes: [],
            }],
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("UsersTasks.userId")), "numberSubscribedPeople"]],
            },
            group: ["Task.id"],
        };

        if (otherParams.offset) {
            queryParamsToDB.offset = parseInt(otherParams.offset, 10);
        }
        if (otherParams.limit) {
            queryParamsToDB.limit = parseInt(otherParams.limit, 10);
        }
        tasks = await Task.findAll(queryParamsToDB);
        return tasks;
    }

    public async getAllTasksOfUser(task, otherParams, userId) {
        let tasks: ITaskInstance[];
        const taskFilter = this.filterTasks(task, otherParams);
        const queryParamsToDB: any = {
            subQuery: false,
            order: [["createdAt", "DESC"]],
            where: {
                ...taskFilter,
                userId,
            },
            include: [
                {
                    model: UsersTasks,
                    attributes: [],
                },
                {
                    model: Category,
                    attributes: ["name"],
                },
            ],
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("UsersTasks.userId")), "numberSubscribedPeople"]],
            },
            group: ["Task.id"],
        };
        if (otherParams.offset) {
            queryParamsToDB.offset = parseInt(otherParams.offset, 10);
        }
        if (otherParams.limit) {
            queryParamsToDB.limit = parseInt(otherParams.limit, 10);
        }

        tasks = await Task.findAll(queryParamsToDB);
        return tasks;
    }

    public async getAllTasksForAdmin(task, otherParams) {
        let tasks: ITaskInstance[];
        const taskFilter = this.filterTasks(task, otherParams);
        const queryParamsToDB: any = {
            subQuery: false,
            order: [["createdAt", "DESC"]],
            where: {
                ...taskFilter,
            },
            include: [
                {
                    model: UsersTasks,
                    attributes: [],
                },
                {
                    model: Category,
                    attributes: ["name"],
                },
                {
                    model: User,
                    attributes: [],
                },
            ],
            attributes: {
                include: [
                    [
                        sequelize.fn("COUNT", sequelize.col("UsersTasks.userId")),
                        "numberSubscribedPeople",
                    ],
                    [
                        sequelize.fn("concat", sequelize.col("User.firstname"),
                            " ", sequelize.col("User.lastname")), "firstLastName",
                    ],
                ],
            },
            group: ["Task.id"],
        };
        if (otherParams.offset) {
            queryParamsToDB.offset = parseInt(otherParams.offset, 10);
        }
        if (otherParams.limit) {
            queryParamsToDB.limit = parseInt(otherParams.limit, 10);
        }

        tasks = await Task.findAll(queryParamsToDB);
        return tasks;
    }

    public async getOnReviewTasksOfManager(userId, arrayCategoryIdFromGetForFilter) {
        const user = await User.findById(userId);
        let result: number[];
        let whereParams;

        if (user.dataValues.roleId === Roles.manager) {
            if (arrayCategoryIdFromGetForFilter && arrayCategoryIdFromGetForFilter.length > 0) {
                result = arrayCategoryIdFromGetForFilter;
            } else {
                result = await this.getArrayOfCategoryIdOfManager(userId);
            }
            whereParams = {
                categoryId: {
                    [sequelize.Op.in]: result,
                },
                status: Statuses.OnReview,
            };
        } else {
            if (arrayCategoryIdFromGetForFilter && arrayCategoryIdFromGetForFilter.length > 0) {
                whereParams = {
                    categoryId: {
                        [sequelize.Op.in]: arrayCategoryIdFromGetForFilter,
                    },
                    status: Statuses.OnReview,
                };
            } else {
                whereParams = {
                    status: Statuses.OnReview,
                };
            }
        }

        return Task.findAll({
            where: whereParams,
            include: [
                {
                    model: User,
                    attributes: [],
                },
                {
                    model: Category,
                    attributes: ["name"],
                },
            ],
            attributes: {
                include: [
                    [
                        sequelize.fn("concat", sequelize.col("firstname"), " ",
                        sequelize.col("lastname")), "firstLastName",
                    ],
                ],
            },
        });
    }

    public async getOneTask(id: number) {
        const task = Task.findOne({
            where: {
                id,
            },
        });
        return task;
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
        const otherParams = {
            limit: 0,
            offset: 0,
        };
        if (queryObj.limit) {
            otherParams.limit = queryObj.limit;
            delete queryObj.limit;
        }
        if (queryObj.offset) {
            otherParams.offset = queryObj.offset;
            delete queryObj.offset;
        }
        if (queryObj.dateStart) {
            otherParams['dateStart'] = queryObj.dateStart;
            delete queryObj.dateStart;
        }
        if (queryObj.dateEnd) {
            otherParams['dateEnd'] = queryObj.dateEnd;
            delete queryObj.dateEnd;
        }
        task = queryObj;
        result = {
            task,
            otherParams,
        };
        return result;
    }

    public async isTaskOwner(taskId, userId) {
        const res = await this.getOneTask(taskId) as ITaskAttributes;
        return res.userId === userId;
    }

    public async getArraySubscribedTaskIdOfUser(userId) {
        const subscribedTaskOfUser = await UsersTasks.findAll({
            where: {
                userId,
            },
        });

        const arrayOfTaskId: number[] = subscribedTaskOfUser.map((el) => el.dataValues.taskId);
        return arrayOfTaskId;
    }

    public async getArrayOfCategoryIdOfManager(userId) {
        const categoriesOfManager = await UsersCategories.findAll({
            where: {
                userId,
            },
        });

        const arrayOfCategortId = categoriesOfManager.map((el) => el.dataValues.categoryId);
        return arrayOfCategortId;
    }

    public async getTasksStatistics() {
        const OpenTasks: any = {
            where: {
                status: Statuses.Open,
            },
            attributes: [[sequelize.fn("COUNT", sequelize.col("Task.id")), "open"], ["categoryId", "categoryId"]],
            include: [{
                model: Category,
                attributes: ["name"],
            }],
            group: ["Task.categoryId"],
        };
        const allTasks: any = {
            where: all,
            attributes: [[sequelize.fn("COUNT", sequelize.col("Task.id")), "all"], ["categoryId", "categoryId"]],
            include: [{
                model: Category,
                attributes: ["name"],
            }],
            group: ["Task.categoryId"],
        };

        // const result = await Task.scope([allTasks, allOpen]).findAll();
        const opened = (await Task.findAll(OpenTasks) as any).map( (el) => el.dataValues);
        const allTasksResult = (await Task.findAll(allTasks) as any).map( (el) => el.dataValues);

        // Kludge for combaine result
        let tasks = opened.map( (el) => {
            const sameCat = allTasksResult.filter( (it, index) => {
                if (it.Category.name === el.Category.name) {
                    allTasksResult.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
            });
            el.all = sameCat[0].all;
            return el;
        });
        tasks = tasks.concat(allTasksResult);

        return tasks;
    }

    public filterTasks(task, otherParams) {
        let arrayCategoryIdFromGet: number[] = [];
        if (task.title) {
            task.title = {
                [Op.like]: (`%${task.title}%`),
            };
        }
        if (otherParams.dateStart && otherParams.dateEnd) {
            const dateS = new Date(otherParams.dateStart);
            const dateE = new Date(otherParams.dateEnd);
            task.date = {
                [Op.between]: [dateS, dateE],
            };
        }

        if (task.categoryId) {
            Array.isArray(task.categoryId)
                ? arrayCategoryIdFromGet = task.categoryId.map((el) => parseInt(el, 10))
                : arrayCategoryIdFromGet.push(parseInt(task.categoryId, 10));
            task.categoryId = {
                [sequelize.Op.in]: arrayCategoryIdFromGet,
            };
        }

        return task;

    }

}
export default new TaskService();
