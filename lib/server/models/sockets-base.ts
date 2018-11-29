import loggers from "../../tools/loggers";

export const socketServer = (io) => {
    io.on("connection", (socket) => {
        console.log("user connected");

        // socket.on("add-message", (message) => {
        //     console.log(JSON.stringify(message));
        //     io.emit("message", { type: "new-message", text: message });
        // });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

    });
};
