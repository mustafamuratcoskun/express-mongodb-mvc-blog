const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.get("/contribute", pageController.getContribute);
module.exports = router;
