import { Router } from "express";
import {
  getQuestByIdController,
  getQuestFormWithCharacters,
  getQuestsController,
  deleteQuestController,
  postQuestController,
} from "../controllers/questsController.js";

const questsRoutes = Router();

questsRoutes.get("/", getQuestsController);
questsRoutes.get("/new", getQuestFormWithCharacters);
questsRoutes.get("/:id", getQuestByIdController);
questsRoutes.post("/:id/delete", deleteQuestController);
questsRoutes.post("/", postQuestController);

export { questsRoutes };
