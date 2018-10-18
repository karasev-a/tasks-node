import { Router } from "express";

import loginContorller from "../controllers/loginController";

const router: Router = Router();

router.post("/", loginContorller.login);

export default router;
