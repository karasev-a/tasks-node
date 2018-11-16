import { Category, ICategoryAttributes } from "../category";
import * as sequelize from "sequelize";
import { UsersCategories } from "../../users-categories/usersCategories";
import { User } from "../../user/user";
import { Roles, Task, Statuses } from "../../task/task";
import { all } from "bluebird";

class TaskService {

    public async getAllCategories() {
        return Category.findAll();
    }

    public async getOneCategory(categoryId: number) {
        return Category.findOne({
            where: {
                id: categoryId,
            },
        });
    }

    public async deleteCategoryById(categoryId: number) {
        return Number.isInteger(categoryId)
            ? Category.destroy({
                where: {
                    id: categoryId,
                },
            })
            : null;
    }

    public async updateCategory(categoryId: number, category: ICategoryAttributes) {
        if (category && Number.isInteger(categoryId)) {
            delete category.id;
            const result = await Category.update(category, {
                where: {
                    id: categoryId,
                },
            });
            return result;
        }
    }

    public async createCategory(category: ICategoryAttributes) {
        if (category) {
            return Category.create(category);
        }
    }

    public async  getCategoriesOnReview(userId) {
        const user = await User.findById(userId);
        let includeParams;
        (user.dataValues.roleId === Roles.manager)
            ? includeParams = [{
                model: UsersCategories,
                where: {
                    userId,
                },
                attributes: [],
            }]
            : includeParams = [{
                model: UsersCategories,
                attributes: [],
            }];

        return Category.findAll({
            include: includeParams,
        });
    }

    public async getCategoryStatistics() {
        const allTasks: any = {
            attributes: ["name", "id",
                [sequelize.fn("COUNT", sequelize.col("Tasks.id")), "all"],
                // [sequelize.fn("COUNT", sequelize.literal("where Tasks.status = 1")), "open"],
            ],
            include: [
                {
                    model: Task,
                    // attributes: ["categoryId",
                    //     [sequelize.fn("COUNT", sequelize.col("Tasks.id")), "all"],
                    // ],
                    attributes: [],
                },
                // {
                //     model: Task, as: "openTasks",
                //     where: {
                //         status: Statuses.Open,
                //     },
                //     attributes: ["categoryId",
                //         [sequelize.fn("COUNT", sequelize.col("openTasks.id")), "open"],
                //     ],
                // },
            ],
            group: ["Category.id"],
        };
        const openTasks: any = {
            attributes: ["name", "id",
                [sequelize.fn("COUNT", sequelize.col("Tasks.id")), "open"],
                // [sequelize.literal("COUNT(Tasks.id) WHERE Tasks.status=1 "), "open"],
            ],
            include: [
                // {
                //     model: Task,
                //     // attributes: ["categoryId",
                //     //     [sequelize.fn("COUNT", sequelize.col("Tasks.id")), "all"],
                //     // ],
                //     attributes: [],
                //     // having: {status: Statuses.Open},
                // },
                {
                    model: Task,
                    where: {
                        status: Statuses.Open,
                    },
                    attributes: [
                        // "categoryId",
                        // [sequelize.fn("COUNT", sequelize.col("openTasks.id")), "open"],
                    ],
                },
            ],
            group: ["Category.id"],
        };

        const tasksA = await Category.findAll(allTasks).map( (el) => el.dataValues) as any;
        const tasksO = await Category.findAll(openTasks).map( (el) => el.dataValues) as any;
        // Kludge for combaine result
        let tasks = tasksO.map( (el) => {
            const sameCat = tasksA.filter( (it, index) => {
                if (it.name === el.name) {
                    tasksA.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
            });
            el.all = sameCat[0].all;
            return el;
        });
        tasksA.map( (el) => el.open = 0);
        // tasks = tasks.concat(tasksA);

        return tasks.concat(tasksA);
    }
}
export default new TaskService();
