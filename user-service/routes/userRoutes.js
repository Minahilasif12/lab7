const express = require("express");
const { registerUser, getUser, updateBookingCount } = require("../controllers/userController");

const router = express.Router();

router.post("/", registerUser);
router.get("/:userId", getUser);
router.put("/:userId", updateBookingCount);

module.exports = router;
