import { Router } from "express";

import UserController from "../user.controller";

const router: Router = Router();
const handleErrorAsync = (func) => async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };

router.get("/admin/statistic", UserController.getAllWithStatistic);
router.get("/admin", UserController.getAllWithoutLoginUser);
router.get("/profile", UserController.getProfileData);
router.get("/:userId", UserController.getById);
router.delete("/:userId", UserController.delete);
router.put("/:userId", UserController.update); // for admin
router.put("/", UserController.update); // for user
router.post("/", UserController.create);
router.put("/:userId", UserController.update);
// router.post("/", UserController.create); // we use it currently in index
router.get("/", UserController.getAll);

export default router;
