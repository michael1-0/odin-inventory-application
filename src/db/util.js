import { config } from "dotenv";

config();

function getDatabaseUrl() {
  const env = process.env.ENVIRONMENT || "local";
  switch (env) {
    case "local":
      return `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
    case "cloud":
      return `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}?sslmode=require&channel_binding=require`;
    default:
      throw new Error(`Unknown ENVIRONMENT: ${env}`);
  }
}

export { getDatabaseUrl };
