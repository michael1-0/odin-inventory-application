import { Router } from "express";
import {
  getCharactersController,
  postCharacterController,
  putCharacterController,
  deleteCharacterController,
  getCharacterFormController,
  getCharacterEditFormController
} from "../controllers/charactersController.js";

const charactersRoutes = Router();

charactersRoutes.get("/", getCharactersController);
charactersRoutes.post("/", postCharacterController);
charactersRoutes.post("/:id", putCharacterController);
charactersRoutes.post("/:id/delete", deleteCharacterController)

charactersRoutes.get("/new", getCharacterFormController);
charactersRoutes.get("/:id/edit", getCharacterEditFormController)

export { charactersRoutes };
