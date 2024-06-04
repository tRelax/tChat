const {Server} = require("socket.io");
require("dotenv").config();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENTURL;

const io = new Server({
    cors: CLIENT_URL
});

let onlineUsers = [];

io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
        onlineUsers.push({
            userId,
            socketId: socket.id,
            room: "",
        })

        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("addUserToRoom", (userId, chatId) => {

        const user = onlineUsers.find(user => user.userId === userId.userId)

        if (user && chatId.chatId) {
            user.room = chatId.chatId;
            socket.join(user.room)
        }
    })

    socket.on("sendMessage", (message) => {
        console.log(message)

        const user = onlineUsers.find(user => user.userId === message.recipientId)

        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    })

    socket.on("sendMessageToRoom", (message) => {
        console.log(message)

        const user = onlineUsers.find(user => user.userId === message.senderInfo.senderId);
        console.log(user)

        if (user) {
            console.log("sending to room", user.room)
            io.to(user.room).emit("getMessage", message);
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });

});

io.listen(PORT);