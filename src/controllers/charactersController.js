import { body, matchedData, validationResult } from "express-validator";
import {
  getCharactersDal,
  getCharacterByIdDal,
  postCharacterDal,
  putCharacterDal,
  deleteCharacterDal,
  getFactionsDal,
} from "../db/queries.js";

const errorMessages = {
  alpha: "must only contain letters",
  descriptionLength: "must be within 1-100 characters long",
  integer: "must be a valid integer",
};
const validateCharacter = [
  body("faction")
    .trim()
    .customSanitizer((value) => value.split("-")[1])
    .toInt(),
  body("name").trim().isAlpha().withMessage(`Name ${errorMessages.alpha}`),
  body("height").toInt().isInt().withMessage(`Height ${errorMessages.integer}`),
  body("description")
    .isLength({ min: 1, max: 100 })
    .withMessage(`Description ${errorMessages.descriptionLength}`),
];

async function getCharactersController(req, res) {
  const characters = await getCharactersDal();
  return res.render("characters/index", { characters: characters });
}

async function postCharacterController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const factions = await getFactionsDal();
    return res.render("characters/new", {
      factions: factions,
      errors: errors.array() || null,
    });
  }
  const body = matchedData(req);
  await postCharacterDal({
    factionId: body.faction,
    name: body.name,
    height: body.height,
    description: body.description,
  });
  return res.status(300).redirect("/characters");
}

async function putCharacterController(req, res) {
  const body = req.body;
  const characterId = req.params.id;
  await putCharacterDal({
    characterId: Number(characterId),
    name: body.name,
    height: Number(body.height),
    description: body.description,
  });
  return res.status(200).redirect("/characters");
}

async function deleteCharacterController(req, res) {
  const id = req.params.id;
  await deleteCharacterDal(id);
  return res.status(200).redirect("/characters");
}

async function getCharacterFormController(req, res) {
  const factions = await getFactionsDal();
  return res.render("characters/new", { factions: factions, errors: null });
}

async function getCharacterEditFormController(req, res) {
  const id = req.params.id;
  const character = await getCharacterByIdDal(id);

  res.render("characters/edit", { character: character });
}

const postCharacterPipeline = [validateCharacter, postCharacterController];

export {
  getCharactersController,
  postCharacterPipeline,
  putCharacterController,
  deleteCharacterController,
  getCharacterFormController,
  getCharacterEditFormController,
};
