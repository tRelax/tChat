const express = require("express");
const {uploadImage, getImage, deleteImage, changeImageData} = require("../controllers/imageController");
const authToken = require("../middleware/auth");

const router = express.Router();

router.get("/:imageId", getImage);
router.post("/upload", authToken, uploadImage);
router.delete("/delete", authToken, deleteImage);
router.put("/changeData", authToken, changeImageData);

module.exports = router;