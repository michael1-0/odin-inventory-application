import {
  getCharactersDal,
  getQuestsDal,
  getQuestByIdDal,
  deleteQuestDal,
  postQuestDal,
} from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";
import { NotFound } from "../errors/NotFound.js";

const errorMessages = {
  alpha: "must only contain letters",
  descriptionLength: "must be within 1-100 characters long",
  characterIndicesEmpty: "must not be empty",
};
const validateQuest = [
  body("title").trim(),
  body("description")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`Description ${errorMessages.descriptionLength}`),
  ,
  body("characterIndices")
    .trim()
    .customSanitizer((value) => {
      return Array.isArray(value)
        ? value.map((index) => Number(index))
        : Number(value);
    })
    .not()
    .equals("0")
    .withMessage(`Characters to assign ${errorMessages.characterIndicesEmpty}`),
];

async function getQuestsController(req, res) {
  const quests = await getQuestsDal();
  res.render("quests/index", { quests: quests });
}

async function getQuestFormWithCharacters(req, res) {
  const characters = await getCharactersDal();
  res.render("quests/new", { characters: characters, errors: null });
}

async function getQuestByIdController(req, res) {
  const id = req.params.id;
  const questData = await getQuestByIdDal(Number(id));
  if (questData.length === 0) {
    await deleteQuestDal(Number(id));
    throw new NotFound("Quest not found");
  }
  res.render("quests/full", { questData: questData });
}

async function deleteQuestController(req, res) {
  const id = req.params.id;
  await deleteQuestDal(Number(id));
  res.status(300).redirect("/quests");
}

async function postQuestController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const characters = await getCharactersDal();
    return res.render("quests/new", {
      characters: characters,
      errors: errors.array(),
    });
  }
  const body = matchedData(req);
  await postQuestDal({
    title: body.title,
    description: body.description,
    characterIndices: body.characterIndices,
  });
  res.status(300).redirect("/quests");
}

const postQuestPipeline = [validateQuest, postQuestController];

export {
  getQuestsController,
  getQuestFormWithCharacters,
  getQuestByIdController,
  deleteQuestController,
  postQuestPipeline,
};
