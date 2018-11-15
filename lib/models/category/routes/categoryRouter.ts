import { Router } from "express";

import categoryController from "../categoryController";
import { handleErrorAsync } from "../../../middleware/handleErrorAsync";
import { permit } from "../../../middleware/check-role.midleware";
import { Roles } from "../../task/task";

const router: Router = Router();

router.get("/managerTasks", permit(Roles.manager, Roles.admin),
    handleErrorAsync(categoryController.getCategoriesOnReview));
router.get("/:categoryId", handleErrorAsync(categoryController.getOneCategory));
router.delete("/:categoryId", handleErrorAsync(categoryController.deleteCategory));
router.put("/:categoryId", handleErrorAsync(categoryController.updateCategory));
router.post("/", handleErrorAsync(categoryController.createNewCategory));
router.get("/", handleErrorAsync(categoryController.getAllCategories));

export default router;
