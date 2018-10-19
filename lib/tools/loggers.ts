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

const myFormat = winston.format.printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

class LoggerService {
  private commonLogger: any;

  constructor() {
    this.commonLogger = null;
  }

  public initLoggers() {
    this.commonLogger = this.getCommonLogger();
  }

  public initGlobalLogger() {
    global.logger = this.commonLogger;
  }

  public getCommonLogger(): any {
    const cosoleLogTransport = new (winston.transports.Console)({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        myFormat,
      ),
    });

    const info = winston.createLogger({
      level: "info",
      transports: [
        cosoleLogTransport,
        new (winston.transports.File)({
          filename: path.join("logs", "common", "logInfo.log"),
          level: "info",
          handleExceptions: false,
          maxsize: fileSize,
          format: winston.format.combine(
            winston.format.timestamp(),
            myFormat,
          ),
        }),
      ],
    });

    const err = winston.createLogger({
      level: "info",
      transports: [
        cosoleLogTransport,
        new (winston.transports.File)({
          filename: path.join("logs", "common", "logError.log"),
          level: "info",
          handleExceptions: false,
          maxsize: fileSize,
          format: winston.format.combine(
            winston.format.timestamp(),
            myFormat,
          ),
        }),
      ],
    });



    // const fileLoggerInfo = new(winston.transports.File)({
    //   filename: path.join("logs", "common", "logInfo.log"),
    //   level: "info",
    //   handleExceptions: false,
    //   maxsize: fileSize,
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     myFormat,
    //   ),
    // });

    // const fileLoggerError = new(winston.transports.File)({
    //   filename: path.join("logs", "common", "logError.log"),
    //   level: "error",
    //   handleExceptions: true,
    //   maxsize: fileSize,
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     myFormat,
    //   ),
    // });

    // const result = winston.createLogger({
    //   transports: [
    //     new(winston.transports.Console)({
    //       format: winston.format.combine(
    //         winston.format.colorize(),
    //         winston.format.timestamp(),
    //        myFormat,
    //       ),
    //     }),
    //     fileLoggerInfo,
    //     fileLoggerError,
    //   ],
    //   exceptionHandlers: [fileLoggerError],
    // });
    // return result;
    const result = {
      info: (msg) => {
        info.info(msg);
      },
      error: (msg) => {
        err.error(msg);
      },
    };
    return result;
  }
}

export default new LoggerService();
