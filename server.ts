
import * as http from "http";
import app from "./lib/server/models/express-app";
import DBService from "./lib/db/services/db-service";
import * as socketIo from "socket.io";

const initApp = async () => {
  try {
    await DBService.initDataBase();
    const port = app.get("port");
    const server = http.createServer(app);
    const io = socketIo(server);
    io.of("/socket").on("connection", (socket) => {
      console.log("user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("add-message", (message) => {
        io.emit("message", { type: "new-message", text: message });
      });
    });
    server.listen(port, () => {
      global.logger.info(`Server started on port ${port}`);
    });
  } catch (error) {
    // logger.info(error);
    global.logger.error(error);
  }
};

initApp();
