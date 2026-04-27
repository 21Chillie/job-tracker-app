import db from "@config/db-client";
import logger from "@config/logger";
import { readFileSync } from "fs";
import { join } from "path";

const SCHEMA_FILES = [
	{ type: "user", file: "../schemas/user.schema.sql" },
	{ type: "job", file: "../schemas/job.schema.sql" },
];

export function runDatabaseMigration() {
	const applyMigrations = db.transaction((schemaFiles: { type: string; file: string }[]) => {
		for (const schemaFile of schemaFiles) {
			const schemaPath = join(__dirname, schemaFile.file);
			const sql = readFileSync(schemaPath, "utf8");

			// check if specific table exist
			const isTableExists = db
				.query(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`)
				.get(schemaFile.type);

			if (!isTableExists) {
				logger.info(`Initialized schema for: ${schemaFile.type} table`);
				db.run(sql);
			}
		}
	});

	try {
		applyMigrations(SCHEMA_FILES);
		logger.info("Database migration completed successfully");
	} catch (err) {
		logger.error("Database migration failed. Database has been rolled back.");

		if (err instanceof Error) {
			logger.error(`Reason: ${err.message}`);
		}

		process.exit(1);
	}
}
