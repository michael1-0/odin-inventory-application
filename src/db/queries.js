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

async function getCharactersQuestsCountDal() {
  const { rows } = await pool.query(
    `
    SELECT characters.name, 
    COUNT(quests.quest_id) AS quest_count, 
    factions.name AS faction 
    FROM characters 
    JOIN characters_quests ON characters_quests.character_id = characters.character_id 
    JOIN quests ON quests.quest_id = characters_quests.quest_id 
    JOIN factions ON factions.faction_id = characters.faction_id 
    GROUP BY characters.name, factions.name
    `
  );
  return rows;
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
    quests.title,
    quests.description,
    quests.quest_id
    FROM quests
    `
  );
  return rows;
}

async function getQuestByIdDal(questId) {
  const { rows } = await pool.query(
    `
    SELECT
    characters.name,
    quests.description,
    quests.title
    FROM quests
    JOIN characters_quests ON characters_quests.quest_id = quests.quest_id
    JOIN characters ON characters_quests.character_id = characters.character_id 
    WHERE quests.quest_id = $1
    `,
    [questId]
  );
  return rows;
}

async function deleteQuestDal(id) {
  await pool.query(
    `
    DELETE FROM quests
    WHERE quest_id = $1
    `,
    [id]
  );
}

async function postQuestDal({ title, description, characterIndices }) {
  const { rows } = await pool.query(
    `
    INSERT INTO quests (title, description)
    VALUES ($1, $2)
    RETURNING quest_id
    `,
    [title, description]
  );
  const id = rows[0]["quest_id"];
  if (Array.isArray(characterIndices)) {
    characterIndices.map(async (index) => {
      await pool.query(
        `
      INSERT INTO characters_quests (character_id, quest_id)
      VALUES ($1, $2)
      `,
        [index, id]
      );
    });
  } else {
    await pool.query(
      `
      INSERT INTO characters_quests (character_id, quest_id)
      VALUES ($1, $2)
      `,
      [characterIndices, id]
    );
  }
}

export {
  // characters
  getCharactersDal,
  getCharacterByIdDal,
  getCharactersQuestsCountDal,
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
  getQuestByIdDal,
  deleteQuestDal,
  postQuestDal,
};
