import { Router } from "express";

import loginContorller from "../controllers/loginController";

const router: Router = Router();

router.post("/", loginContorller.login);
router.get("/check", loginContorller.islogin);

export default router;
