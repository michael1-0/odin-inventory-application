import {
  getCharactersDal,
  getQuestsDal,
  getQuestByIdDal,
  deleteQuestDal,
  postQuestDal,
} from "../db/queries.js";

async function getQuestsController(req, res) {
  const quests = await getQuestsDal();
  res.render("quests/index", { quests: quests });
}

async function getQuestFormWithCharacters(req, res) {
  const characters = await getCharactersDal();
  res.render("quests/new", { characters: characters });
}

async function getQuestByIdController(req, res) {
  const id = req.params.id;
  const questData = await getQuestByIdDal(Number(id));
  res.render("quests/full", { questData: questData });
}

async function deleteQuestController(req, res) {
  const id = req.params.id;
  await deleteQuestDal(Number(id));
  res.status(300).redirect("/quests");
}

async function postQuestController(req, res) {
  const body = req.body;
  await postQuestDal({
    title: body.title,
    description: body.description,
    characterIndices: Array.isArray(body.characterIndices)
      ? body.characterIndices.map((index) => Number(index))
      : Number(body.characterIndices),
  });
  res.status(300).redirect("/quests");
}

export {
  getQuestsController,
  getQuestFormWithCharacters,
  getQuestByIdController,
  deleteQuestController,
  postQuestController,
};
