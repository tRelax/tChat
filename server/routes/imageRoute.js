const express = require("express");
const {uploadImage, getImage} = require("../controllers/imageController");
const authToken = require("../middleware/auth");

const router = express.Router();

router.get("/:imageId", getImage);
router.post("/upload", authToken, uploadImage);

module.exports = router;