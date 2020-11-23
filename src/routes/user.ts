import { Router } from "express";
import userController from "../controllers/user-controller";

const router = Router();

//Create a new user
router.post("/", userController.newUser);

export default router;