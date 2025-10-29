import { Pool } from "pg";
import { getDatabaseUrl } from "./util.js";

export default new Pool({
  connectionString: getDatabaseUrl(),
});
