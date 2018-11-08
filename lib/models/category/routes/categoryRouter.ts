import { Router } from "express";

import categoryController from "../categoryController";

const router: Router = Router();

router.get("/managerTasks", categoryController.getCategoriesOfManager);
router.get("/:categoryId", categoryController.getOneCategory);
router.delete("/:categoryController", categoryController.deleteCategory);
router.put("/categoryController", categoryController.updateCategory);
router.post("/", categoryController.createNewCategory);
router.get("/", categoryController.getAllCategories);

export default router;
