import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import express from "express";
import { charactersRoutes } from "./src/routes/charactersRoutes.js";
import { questsRoutes } from "./src/routes/questsRoutes.js";
import { factionsRoutes } from "./src/routes/factionsRoutes.js";
import { getCharactersQuestsCountController } from "./src/controllers/otherControllers.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use("/characters", charactersRoutes);
app.use("/quests", questsRoutes);
app.use("/factions", factionsRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err);
});

app.get("/", getCharactersQuestsCountController);

export { app };
