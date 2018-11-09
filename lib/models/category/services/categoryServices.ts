import { Category, ICategoryAttributes} from "../category";
import * as sequelize from "sequelize";
import { UsersCategories } from "../../users-categories/usersCategories";

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
        return  Number.isInteger(categoryId)
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

    public async  getCategoriesOfManager(userId) {

        return Category.findAll({
            include: [{
                model: UsersCategories,
                where: {
                    userId,
                },
                attributes: [],
            }],
        });
    }

}
export default new TaskService();
