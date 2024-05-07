const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute)

//CRUD
//app.post || app.get || app.put || app.delete

app.get("/", (req, res) => {
    res.send("Welcome to tChatAPI!");
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) =>{
    console.log(`Server running on port: ${port}`)
})

mongoose.connect(uri, {}).then(()=> console.log("MongoDB connection established"))
    .catch((err) => console.error("MongoDB connection failed: ", err.message));
