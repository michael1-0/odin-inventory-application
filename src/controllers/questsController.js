import { getQuestsDal } from "../db/queries.js";

async function getQuests(req, res) {
  const quests = await getQuestsDal();
  res.render("quests/index", { quests: quests });
}

export { getQuests };
