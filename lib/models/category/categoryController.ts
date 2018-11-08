import categoryService from "./services/categoryServices";
import loggers from "../../tools/loggers";
import { ICategoryAttributes, ICategoryInstance } from "./category";
class CategoryController {
    public async getAllCategories(req, res) {
        const result = await categoryService.getAllCategories();
        res.status(200).send(result);
        global.logger.info(result);
    }

    public async getOneCategory(req, res, next) {
        const categoryId = parseInt(req.params.categoryId, 10);
        const category = await categoryService.getOneCategory(categoryId);
        if (category) {
            res.status(200).send(category);
        } else {
            res.sendStatus(404);
        }
    }

    public async deleteCategory(req, res) {
        const categoryId = parseInt(req.params.categoryId, 10);
        const result = await categoryService.deleteCategoryById(categoryId);
        result ? res.sendStatus(204) : res.sendStatus(404);
    }

    public async createNewCategory(req, res) {
        const category = req.body;
        const result = await categoryService.createCategory(category);
        global.logger.info(`Create categoty: ${category}`);
        res.status(201).send(result);

    }

    public async updateCategory(req, res) {
        const categoryId = parseInt(req.params.categoryId, 10);
        const category = req.body;
        const result = await categoryService.updateCategory(categoryId, category);
        global.logger.info(`Update categoty: ${category}`);
        res.status(200).send(result);
    }
    public async getCategoriesOfManager(req, res) {
        const userId = req.userId;
        let result;
        if (req.roleId === 2) {
            result = await categoryService.getCategoriesOfManager(userId);
            res.status(200).send(result);
            global.logger.info(`Categories of manager with id=${userId}: ${result}`);
        } else {
            res.sendStatus(404);
        }
    }
}

export default new CategoryController();
