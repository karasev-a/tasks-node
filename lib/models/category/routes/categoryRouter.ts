import { Router } from "express";

import categoryController from "../categoryController";
import {handleErrorAsync} from "../../../middleware/handleErrorAsync";
import {checkAdmin, checkManagerOrAdmin} from "../../../middleware/check-role.midleware";

const router: Router = Router();

router.get("/managerTasks", checkManagerOrAdmin, handleErrorAsync(categoryController.getCategoriesOnReview));
router.get("/:categoryId", handleErrorAsync(categoryController.getOneCategory));
router.delete("/:categoryController", handleErrorAsync(categoryController.deleteCategory));
router.put("/categoryController", handleErrorAsync(categoryController.updateCategory));
router.post("/", handleErrorAsync(categoryController.createNewCategory));
router.get("/", handleErrorAsync(categoryController.getAllCategories));

export default router;
