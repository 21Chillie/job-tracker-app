import db from "@db/db-client";
import { readFileSync } from "fs";
import { join } from "path";
import logger from "~/config/logger";

export function jobsMigrations() {
  const schemaPath = join(__dirname, "../db/schemas/jobs.schema.sql");

  try {
    const sql = readFileSync(schemaPath, "utf8");

    // check if user table is exist
    const tableExists = db
      .query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='jobs'",
      )
      .get();

    if (!tableExists) {
      // execute the entire generated SQL file
      db.run(sql);
      logger.info("Database schema initialized (jobs).");
    }
  } catch (error) {
    logger.fatal("Migration failed");
    console.error(error);
    process.exit(1);
  }
}
