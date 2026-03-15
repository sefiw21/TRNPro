import dotenv from "dotenv";
import { buildApp } from "./app.js";
dotenv.config();

const start = async () => {
  const app = buildApp();
  try {
    await app.listen({ port: 8080 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
