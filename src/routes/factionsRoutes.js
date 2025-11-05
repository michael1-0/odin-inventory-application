import { Router } from "express";
import {
  getFactionsController,
  postFactionPipeline,
  putFactionController,
  deleteFactionController,
  getFactionFormController,
  getFactionEditFormController,
} from "../controllers/factionsController.js";

const factionsRoutes = Router();

factionsRoutes.get("/", getFactionsController);
factionsRoutes.post("/", postFactionPipeline);
factionsRoutes.post("/:id", putFactionController);
factionsRoutes.post("/:id/delete", deleteFactionController);

factionsRoutes.get("/:id/edit", getFactionEditFormController);
factionsRoutes.get("/new", getFactionFormController);

export { factionsRoutes };
