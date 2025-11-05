import {
  getFactionsDal,
  postFactionDal,
  putFactionDal,
  deleteFactionDal,
  getFactionByIdDal,
} from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const errorMessages = {
  alpha: "must only contain letters",
  hiddenTruthLength: "must be within 1-100 characters long",
};
const validateFaction = [
  body("name").trim().isAlpha().withMessage(`Name ${errorMessages.alpha}`),
  body("goal").trim(),
  body("hiddenTruth")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`Name ${errorMessages.hiddenTruthLength}`),
];

async function getFactionsController(req, res) {
  const factions = await getFactionsDal();
  res.render("factions/index", { factions: factions });
}

async function postFactionController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("factions/new", {
      errors: errors.array() || null,
    });
  }
  const body = matchedData(req);
  await postFactionDal({
    name: body.name,
    goal: body.goal,
    hiddenTruth: body.hiddenTruth,
  });
  res.status(300).redirect("/factions");
}

async function putFactionController(req, res) {
  const body = req.body;
  const factionId = req.params.id;
  await putFactionDal({
    factionId: Number(factionId),
    name: body.name,
    goal: body.goal,
    hiddenTruth: body.hiddenTruth,
  });
  res.status(200).redirect("/factions");
}

async function deleteFactionController(req, res) {
  const id = req.params.id;
  await deleteFactionDal(id);
  res.status(200).redirect("/factions");
}

async function getFactionFormController(req, res) {
  res.render("factions/new", { errors: null });
}

async function getFactionEditFormController(req, res) {
  const id = req.params.id;
  const faction = await getFactionByIdDal(id);
  res.render("factions/edit", { faction: faction });
}

const postFactionPipeline = [validateFaction, postFactionController];

export {
  getFactionsController,
  postFactionPipeline,
  putFactionController,
  deleteFactionController,
  getFactionFormController,
  getFactionEditFormController,
};
