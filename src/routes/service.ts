import { Router } from "express";
import ServiceController from "../controllers/service-controller";

const router = Router();

//Create a new user
router.post("/", ServiceController.newService);
router.get("/", ServiceController.getAllServices);
router.post("/rate", ServiceController.rateService);

export default router;