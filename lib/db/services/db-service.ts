import db from "../models/db";
import MigrationService from "./migration-service";
import loggers from "../../tools/loggers";
import { UsersCategories } from "../../models/users-categories/usersCategories";
const usersCategories = UsersCategories;

class DBService {
    public static async initDataBase() {
        try {
            await db.authenticate();
            await db.sync();
            // await MigrationService.runMigrations();
            await MigrationService.runSeeders();
        } catch (err) {
            console.log(err);
            global.logger.error("DB init ERROR: " + err);
        }
    }
}

export default DBService;
