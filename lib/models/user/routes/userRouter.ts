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

router.get("/:userId", handleErrorAsync, UserController.getById);
router.delete("/:userId", handleErrorAsync, UserController.delete);
router.put("/:userId", handleErrorAsync, UserController.update);
router.post("/", handleErrorAsync, UserController.create);
router.get("/", handleErrorAsync, UserController.getAll);

export default router;
