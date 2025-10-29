import {
  getCharactersDal,
  getCharacterByIdDal,
  postCharacterDal,
  putCharacterDal,
  deleteCharacterDal,
  getFactionsDal,
} from "../db/queries.js";

async function getCharactersController(req, res) {
  const characters = await getCharactersDal();
  return res.render("characters/index", { characters: characters });
}

async function postCharacterController(req, res) {
  const body = req.body;
  await postCharacterDal({
    factionId: body.faction.split("-")[1],
    name: body.name,
    height: Number(body.height),
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
  return res.render("characters/new", { factions: factions });
}

async function getCharacterEditFormController(req, res) {
  const id = req.params.id;
  const character = await getCharacterByIdDal(id);

  res.render("characters/edit", { character: character });
}

export {
  getCharactersController,
  postCharacterController,
  putCharacterController,
  deleteCharacterController,
  getCharacterFormController,
  getCharacterEditFormController,
};
