
import * as http from "http";
import app from "./lib/server/models/express-app";
import DBService from "./lib/db/services/db-service";
import * as socketIo from "socket.io";
import { socketServer } from "./lib/server/models/sockets-base";

const initApp = async () => {
  try {
    await DBService.initDataBase();
    const port = app.get("port");
    const server = http.createServer(app);
    const io = socketIo(server);
    socketServer(io);
    server.listen(port, () => {
      global.logger.info(`Server started on port ${port}`);
    });
  } catch (error) {
    // logger.info(error);
    global.logger.error(error);
  }
};

initApp();
