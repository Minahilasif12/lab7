const express = require("express");
const { addCar, getCar, updateAvailability } = require("../controllers/carController");

const router = express.Router();

router.post("/", addCar);
router.get("/:carId", getCar);
router.put("/:carId", updateAvailability);

module.exports = router;
