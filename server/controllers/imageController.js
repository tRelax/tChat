const imageModel = require("../models/imageModel");

const uploadImage = async (req, res) => {
    const {serverImage} = req.body;

    try {
        const imageData = {
            type: serverImage.type,
            data: serverImage.data,
        }

        const newImage = new imageModel(imageData);
        const response = await newImage.save();
        res.status(200).json(response);
        console.log("SUCCESS! uploadImage");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getImage = async (req, res) => {
    const {imageId} = req.params;

    try {
        const image = await imageModel.findById(imageId);
        const imgData = image.data.split(",")[1];
        const buf = Buffer.from(imgData, 'base64');
        res.header("Content-Type", image.type).status(200).send(buf);
        console.log("SUCCESS! getImage");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteImage = async (req, res) => {
    const {imageId} = req.body;

    try {
        if (!imageId) return res.status(200).json("No image found by that id");
        await imageModel.findByIdAndDelete(imageId);
        res.status(200).json("Successfully deletedImage");
        console.log("SUCCESS! deleteImage");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const changeImageData = async (req, res) => {
    const {imageId, newImage} = req.body;

    try {
        if (!imageId) return res.status(200).json("No image found by that id");

        const newImageData = newImage.data;
        const changedImage = await imageModel.findByIdAndUpdate(imageId, {data: newImageData});
        res.status(200).json(changedImage);
        console.log("SUCCESS! changeImageData");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteImageLocally = async (imageId) => {
    try {
        if (!imageId) return "No image found by that id";
        await imageModel.findByIdAndDelete(imageId);
        console.log("SUCCESS! deleteImageLocally");
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = {uploadImage, getImage, deleteImage, changeImageData, deleteImageLocally};