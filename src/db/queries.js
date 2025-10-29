import pool from "./pool.js";

async function getCharactersDal() {
  const { rows } = await pool.query(
    `
    SELECT
    character_id,
    name,
    height,
    description 
    FROM characters
    ORDER BY character_id
    `
  );
  return rows;
}

async function getCharacterByIdDal(id) {
  const { rows } = await pool.query(
    `
    SELECT
    character_id,
    name,
    height,
    description
    FROM characters
    WHERE character_id = $1
    `,
    [id]
  );
  return rows[0];
}

async function postCharacterDal({ factionId, name, height, description }) {
  await pool.query(
    `
    INSERT INTO characters (faction_id, name, height, description)
    VALUES ($1, $2, $3, $4)
    `,
    [factionId, name, height, description]
  );
}

async function putCharacterDal({ characterId, name, height, description }) {
  await pool.query(
    `
    UPDATE characters
    SET name = $1, height = $2, description = $3
    WHERE character_id = $4
    `,
    [name, height, description, characterId]
  );
}

async function deleteCharacterDal(id) {
  await pool.query(
    `
    DELETE FROM characters
    WHERE character_id = $1
    `,
    [id]
  );
}

async function getFactionsDal() {
  const { rows } = await pool.query(
    `
    SELECT
    faction_id,
    name,
    goal,
    hidden_truth
    FROM factions
    ORDER BY faction_id
    `
  );
  return rows;
}

async function getFactionByIdDal(id) {
  const { rows } = await pool.query(
    `
    SELECT
    faction_id, 
    name,
    goal,
    hidden_truth
    from factions
    WHERE faction_id = $1
    `,
    [id]
  );
  return rows[0];
}

async function postFactionDal({ name, goal, hiddenTruth }) {
  await pool.query(
    `
    INSERT INTO factions (name, goal, hidden_truth)
    VALUES ($1, $2, $3)
    `,
    [name, goal, hiddenTruth]
  );
}

async function putFactionDal({ factionId, name, goal, hiddenTruth }) {
  await pool.query(
    `
    UPDATE factions
    SET name = $1, goal = $2, hidden_truth = $3
    WHERE faction_id = $4
    `,
    [name, goal, hiddenTruth, factionId]
  );
}

async function deleteFactionDal(id) {
  await pool.query(
    `
    DELETE FROM factions
    WHERE faction_id = $1
    `,
    [id]
  );
}

async function getQuestsDal() {
  const { rows } = await pool.query(
    `
    SELECT
    characters.name AS assignee,
    quests.description
    FROM quests
    JOIN characters
    ON quests.character_id = characters.character_id
    `
  );
  return rows;
}

export {
  // characters
  getCharactersDal,
  getCharacterByIdDal,
  postCharacterDal,
  putCharacterDal,
  deleteCharacterDal,
  // factions
  getFactionsDal,
  getFactionByIdDal,
  postFactionDal,
  putFactionDal,
  deleteFactionDal,
  // quests
  getQuestsDal,
};
