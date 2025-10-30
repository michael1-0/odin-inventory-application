import { Client } from "pg";
import { getDatabaseUrl } from "./util.js";

const SQL = `
DROP TABLE IF EXISTS factions, characters, quests, characters_quests CASCADE;

CREATE TABLE factions (
  faction_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100),
  goal VARCHAR(50),
  hidden_truth VARCHAR(50)
);
CREATE TABLE characters (
  character_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  faction_id INTEGER NOT NULL,
  name VARCHAR(100),
  height INTEGER,
  description VARCHAR(255),
  CONSTRAINT fk_faction FOREIGN KEY (faction_id) REFERENCES factions(faction_id)
);
CREATE TABLE quests (
  quest_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255),
  description VARCHAR(255)
);
CREATE TABLE characters_quests(
  character_quest_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  character_id INTEGER NOT NULL,
  quest_id INTEGER NOT NULL,
  CONSTRAINT fk_character FOREIGN KEY (character_id) REFERENCES characters(character_id) ON DELETE CASCADE,
  CONSTRAINT fk_quest FOREIGN KEY (quest_id) REFERENCES quests(quest_id) ON DELETE CASCADE
);

INSERT INTO factions (name, goal, hidden_truth)
VALUES 
('YoRHa', 'Fight machines for humanity', 'Humanity is extinct; YoRHa is disposable'),
('Replicant', 'Live as "humans"', 'They are soulless shells'),
('Council of Humanity', 'Inspire androids' , 'Entirely fabricated'),
('Gestalt', 'Reunite with Replicants', 'They are the original human souls'),
('Square Enix', 'Creation', 'Very powerful');

INSERT INTO characters (faction_id, name, height, description)
VALUES
(1, '2B', 168, 'Combat android, secretly tasked with monitoring 9S.'),
(1, '9S', 170, 'Combat android, secretly tasked with monitoring 9S.'),
(2, 'Nier', 168, 'Believes he''s human, fights Shades, unaware of the Replicant/Gestalt system.'),
(2, 'Yonah', 151, 'Nier''s sister'),
(4, 'The Shadowlord', 185, 'The true human soul of Nier, trying to reunite with his Replicant Yonah.'),
(3, '???', NULL, '???');

INSERT INTO quests (title, description) 
VALUES
('[E]nd', 'Unleash the sealed power to reclaim lost humanity'),
('Vague Hope', 'Eliminate rogue machine lifeforms in the abandoned factory');

INSERT INTO characters_quests (character_id, quest_id)
VALUES
(1, 2),
(2, 2),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(6, 2);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: getDatabaseUrl(),
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
