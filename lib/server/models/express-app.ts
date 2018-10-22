
import * as express from "express";
import { NextFunction, Request, Response, Router } from "express";
import * as bodyParser from "body-parser";
import routes from "../../routes/index";
import { UsersCategories } from "../../models/users-categories/usersCategories";
import { UsersTasks } from "../../models/users-tasks/usersTasks";
import * as morgan from "morgan";
import loggers from "../../tools/loggers";

const ut = UsersTasks;
const us = UsersCategories;
loggers.initLoggers();
loggers.initGlobalLogger();

class App {

  public app: express.Application;

  constructor() {
    this.app = express();
    this._config();
  }

  private _config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    global.logger.info.stream = {
      write: (message, encoding) => {
        global.logger.info(message);
      },
    };
    this.app.use(morgan("combined", {stream: global.logger.info.stream}));
    const port = process.env.PORT;
    this.app.set("port", port);
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
      res.setHeader("Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, "
        + "Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Cache-Control, Authorization");
      next();
    });

    this.app.use("/api/v1", routes);
    this.app.use("/login", routes);
    // 404
    this.app.use((req: Request, res: Response) => {
      res.status(404).send("404: NotFound");
    });

    // 500
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      global.logger.info(err.stack);
      res.status(500).send("500: Internal server");
    });
  }
}

export default new App().app;
