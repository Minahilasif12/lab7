const express = require("express");
const { createBooking, getUserBookings, cancelBooking } = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getUserBookings);
router.delete("/:bookingId", cancelBooking);

module.exports = router;

