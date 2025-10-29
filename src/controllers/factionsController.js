import {
  getFactionsDal,
  postFactionDal,
  putFactionDal,
  deleteFactionDal,
  getFactionByIdDal,
} from "../db/queries.js";

async function getFactionsController(req, res) {
  const factions = await getFactionsDal();
  res.render("factions/index", { factions: factions });
}

async function postFactionController(req, res) {
  const body = req.body;
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
  res.render("factions/new");
}

async function getFactionEditFormController(req, res) {
  const id = req.params.id;
  const faction = await getFactionByIdDal(id);
  res.render("factions/edit", { faction: faction });
}

export {
  getFactionsController,
  postFactionController,
  putFactionController,
  deleteFactionController,
  getFactionFormController,
  getFactionEditFormController,
};
