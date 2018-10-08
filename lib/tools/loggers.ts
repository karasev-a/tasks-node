import * as winston from "winston";

import * as path from "path";

// declare global { let logger: any; }

declare global {
  namespace NodeJS {
    interface Global {
        logger: any;
    }
  }
}

const fileSize: number = 1024000;

const myFormat = winston.format.printf( (info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

class LoggerService {
  private _commonLogger: any;

  constructor() {
    this._commonLogger = null;
  }

  public initLoggers() {
    this._commonLogger = this.getCommonLogger();
  }

  public initGlobalLogger() {
    global.logger = this._commonLogger;
  }

  public getCommonLogger(): any {
    const fileLogger = new(winston.transports.File)({
      filename: path.join("logs", "common", "log.log"),
      handleExceptions: true,
      maxsize: fileSize,
      format: winston.format.combine(
        winston.format.timestamp(),
        myFormat,
      ),
    });

    const result = winston.createLogger({
      transports: [
        new(winston.transports.Console)({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
           myFormat,
          ),
        }),
        fileLogger,
      ],
      exceptionHandlers: [fileLogger],
    });
    return result;
  }
}

export default new LoggerService();
