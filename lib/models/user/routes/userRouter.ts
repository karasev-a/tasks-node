import { Router } from "express";
import {handleErrorAsync} from "../../../middleware/handleErrorAsync";
import { Roles } from "../../task/task";
import {permit} from "../../../middleware/check-role.midleware";

import UserController from "../user.controller";

const router: Router = Router();

router.get("/admin/statistic", permit(Roles.admin), handleErrorAsync(UserController.getAllWithStatistic));
router.get("/admin", permit(Roles.admin), handleErrorAsync(UserController.getAllWithoutLoginUser));
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
