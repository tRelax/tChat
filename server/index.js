const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authToken = require("./middleware/auth");
const userRoute = require("./routes/userRoutes");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const imagesRoute = require("./routes/imageRoute");

const app = express();
require("dotenv").config();

app.use(express.json({limit: '1mb'}));
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/images", imagesRoute);
app.use(authToken);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

//CRUD
//app.post || app.get || app.put || app.delete

app.get("/", (req, res) => {
    res.send("Welcome to tChatAPI!");
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`)
})

mongoose.connect(uri, {}).then(() => console.log("MongoDB connection established"))
    .catch((err) => console.error("MongoDB connection failed: ", err.message));
