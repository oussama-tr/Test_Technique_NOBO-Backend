import { Router } from "express";
import user from "./user";
import auth from "./auth";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);

export default routes;
