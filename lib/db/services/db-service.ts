import db from "../models/db";
import MigrationService from "./migration-service";
import loggers from "../../tools/loggers";

class DBService {
    public static async initDataBase() {
        try {
            await db.authenticate();
            await db.sync();
            // await MigrationService.runMigrations();
            await MigrationService.runSeeders();
        } catch (err) {
            global.logger(err);
            global.logger.error("DB init ERROR");
            // global.logger.error(err);
        }
    }
}

export default DBService;
