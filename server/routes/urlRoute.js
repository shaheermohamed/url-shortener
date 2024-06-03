const express = require("express");
const router = express.Router();
const { urlCreation, getUrl } = require("../controller/urlController");

router.post("/shorten", urlCreation);

router.get("/:urlCode", getUrl);

module.exports = router;
