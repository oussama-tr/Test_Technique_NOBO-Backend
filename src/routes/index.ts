import { Router } from "express";
import user from "./user";
import auth from "./auth";
import service from "./service";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/service", service);

export default routes;
