const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const createToken = (id, username, imageId) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign({id, username, imageId}, jwtKey, {expiresIn: "30d"}, {});
}

const registerUser = async (req, res) => {
    try {
        const {username, password} = req.body

        if (!username || !password) {
            console.log("All fields are required...");
            return res.status(400).json("All fields are required...");
        }

        let user = await userModel.findOne({username});

        if (user) {
            console.log("Username already exists...");
            return res.status(400).json("Username already exists...");
        }

        if (!validator.isStrongPassword(password, {minSymbols: 0})) {
            console.log("Password must have at least 1 lowercase letter, 1 uppercase letter and 1 number");
            return res.status(400).json("Password must have at least 1 lowercase letter, 1 uppercase letter and 1 number");
        }

        const imageId = "";

        user = new userModel({username, password, imageId});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)

        await user.save();

        const token = createToken(user._id, username, imageId);
        // res.status(200).json({_id: user._id, username, token});

        res.status(200).json(token);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body

        let user = await userModel.findOne({username});

        if (!user)
            return res.status(400).json("Invalid email or password...");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword)
            return res.status(400).json("Invalid password...");

        const token = createToken(user._id, username, user.imageId);

        res.status(200).json(token);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const findUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        let user = await userModel.findById(userId);

        return res.status(200).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const findUserLocally = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return "user not found"; // Handle case where user is not found
        }
        return user;
    } catch (err) {
        console.error(err);
        throw new Error("Error finding user"); // Re-throw error for handling in getMessages
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        return res.status(200).json(users);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const changeUserInfo = async (req, res) => {
    try {
        const {userId, newUsername, changeImage, newImageId} = req.body
        if (userId !== req.userId) return res.status(401).json("Unauthorized access");
        if (newUsername) {
            await userModel.findByIdAndUpdate(userId, {username: newUsername})
        }
        if (changeImage && newImageId) {
            await userModel.findByIdAndUpdate(userId, {imageId: newImageId})
        }
        const user = await userModel.findById(userId);
        const code = uuid.v4().split("-").pop();
        const newImageIdWithCode = user.imageId + "?" + code + "=1";

        const token = createToken(user._id, user.username, newImageIdWithCode);
        return res.status(200).json(token);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = {registerUser, loginUser, findUser, getUsers, findUserLocally, changeUserInfo};