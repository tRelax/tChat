const {Server} = require("socket.io");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENTURL;
const jwtSecret = process.env.JWT_SECRET_KEY;

let onlineUsers = [];

const io = new Server({
    cors: CLIENT_URL | undefined
});

//jwt middleware
io.use((socket, next) => {
    const jwtCookie = socket.handshake.headers.cookie;

    if (!jwtCookie) {
        return next(new Error("no token"));
    }

    if (!jwtCookie.startsWith("tchat-jwt-token=")) {
        return next(new Error("invalid token"));
    }

    const token = jwtCookie.split("=")[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return next(new Error("invalid token"));
        }
        socket.userId = decoded.id;
        next();
    });
});

io.on("connection", (socket) => {
    console.log("[CONNECT] user with id:", socket.userId);
    socket.on("addNewUser", () => {
        !onlineUsers.some(user => user.userId === socket.userId) &&
        onlineUsers.push({
            userId: socket.userId,
            socketId: socket.id,
            room: "",
        })

        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("addUserToRoom", (chatId) => {
        const user = onlineUsers.find(user => user.userId === socket.userId)

        if (user && chatId.chatId) {
            user.room = chatId.chatId;
            socket.join(user.room)
        }
    })

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId)

        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    })

    socket.on("sendMessageToRoom", (message) => {
        const user = onlineUsers.find(user => user.userId === message.senderInfo.senderId);

        if (user) {
            io.to(user.room).emit("getMessage", message);
        }
    })

    socket.on("disconnect", () => {
        console.log("[DISCONNECT] user with id:", socket.userId);
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });

});

io.listen(PORT);