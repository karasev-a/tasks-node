import { Category, ICategoryAttributes } from "../category";
import * as sequelize from "sequelize";
import { UsersCategories } from "../../users-categories/usersCategories";
import { User } from "../../user/user";
import { Roles } from "../../task/task";

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

}
export default new TaskService();
