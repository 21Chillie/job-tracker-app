import { constants, Database } from "bun:sqlite";
import logger from "@config/logger";

const db = new Database("./src/db/database.sqlite", { strict: true });

db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA synchronous = NORMAL;");

export function dbShutdown() {
  logger.debug("Cleaning up SQLite");

  try {
    db.fileControl(constants.SQLITE_FCNTL_PERSIST_WAL, 0);
    db.run("PRAGMA wal_checkpoint(TRUNCATE);");
    db.close();

    logger.debug("Database closed cleanly.");
  } catch (err) {
    logger.fatal("Error during database shutdown");
    console.error(err);
  } finally {
    process.exit(0);
  }
}

export default db;
