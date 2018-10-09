import * as util from "util";
import * as  child_process from "child_process";
const execP = util.promisify(child_process.exec);
import loggers from "../../tools/loggers";

class MigrationService {
    public static async runMigrations() {
        const { stdout, stderr } = await execP("npm run migrations");
        global.logger.info("runMigrations.stdout:");
        global.logger.info(stdout);
        global.logger.info("runMigrations.stderr:");
        global.logger.info(stderr);
        global.logger.info("Migrations sucsessfully finished");
        return true;
    }

    public static async runSeeders() {
        const { stdout, stderr } = await execP("npm run seeders");
        global.logger.info("runSeeders.stdout:");
        global.logger.info(stdout);
        global.logger.info("runSeeders.stderr:");
        global.logger.info(stderr);
        global.logger.info("runSeeders sucsessfully finished");
        return true;
    }
}

export default MigrationService;
