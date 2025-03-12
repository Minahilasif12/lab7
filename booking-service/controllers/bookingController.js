const axios = require("axios");

let bookings = []; 

const USER_SERVICE_URL = "http://localhost:5001";
const CAR_SERVICE_URL = "http://localhost:5002";

exports.createBooking = async (req, res) => {
    const { bookingId, userId, carId, startDate, endDate } = req.body;

    try {
      
        const userResponse = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
        if (userResponse.data.activeBookings >= userResponse.data.maxBookings) {
            return res.status(400).json({ message: "User has reached booking limit" });
        }

        const carResponse = await axios.get(`${CAR_SERVICE_URL}/cars/${carId}`);
        if (!carResponse.data.isAvailable) {
            return res.status(400).json({ message: "Car is not available" });
        }

        bookings.push({ bookingId, userId, carId, startDate, endDate, status: "active" });

        
        await axios.put(`${USER_SERVICE_URL}/users/${userId}`, {
            activeBookings: userResponse.data.activeBookings + 1
        });

        
        await axios.put(`${CAR_SERVICE_URL}/cars/${carId}`, { isAvailable: false });

        res.json({ message: "Booking successful" });
    } catch (error) {
        res.status(500).json({ message: "Error processing booking", error: error.message });
    }
};

exports.getUserBookings = (req, res) => {
    const userBookings = bookings.filter(booking => booking.userId === req.params.userId);
    res.json(userBookings);
};

exports.cancelBooking = async (req, res) => {
    const bookingIndex = bookings.findIndex(booking => booking.bookingId === req.params.bookingId);
    if (bookingIndex === -1) return res.status(404).json({ message: "Booking not found" });

    const { userId, carId } = bookings[bookingIndex];
    bookings[bookingIndex].status = "canceled";

    try {
      
        const userResponse = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
        await axios.put(`${USER_SERVICE_URL}/users/${userId}`, {
            activeBookings: userResponse.data.activeBookings - 1
        });

        await axios.put(`${CAR_SERVICE_URL}/cars/${carId}`, { isAvailable: true });

        res.json({ message: "Booking canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error canceling booking", error: error.message });
    }
};
