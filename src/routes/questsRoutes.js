import { Router } from "express";
import { getQuests } from "../controllers/questsController.js";

const questsRoutes = Router();

questsRoutes.get("/", getQuests);

export { questsRoutes };
