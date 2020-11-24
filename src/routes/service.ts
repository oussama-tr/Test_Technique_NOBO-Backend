import { Router } from "express";
import ServiceController from "../controllers/service-controller";

const router = Router();

//Create a new user
router.post("/", ServiceController.newService);
router.get("/", ServiceController.getAllServices);
router.get("/find/:id([0-9]+)", ServiceController.getAllServicesForUser);
router.post("/rate", ServiceController.rateService);
router.patch("/cancel/:id([0-9]+)", ServiceController.cancelService);

export default router;