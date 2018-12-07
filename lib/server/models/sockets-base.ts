import loggers from "../../tools/loggers";

export const socketServer = (io) => {
    io.clients = [];
    io.on("connect", (socket) => {

        socket.on("add-user", (data) => {
            io.clients.push({
                socketId: socket.id,
                userId: data.userId,
            });
        });
        global.logger.info("user connected");

        socket.on("disconnect", () => {
            io.clients = io.clients.filter( (client) => client.socketId !== socket.id);
            global.logger.info("user disconnected");
        });

    });
};
