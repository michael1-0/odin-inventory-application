import { getCharactersQuestsCountDal } from "../db/queries.js";

async function getCharactersQuestsCountController(req, res) {
  const characters = await getCharactersQuestsCountDal();
  res.render("index", { characters: characters });
}

export { getCharactersQuestsCountController };
