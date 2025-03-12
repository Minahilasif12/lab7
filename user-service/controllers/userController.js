let users = []; 

exports.registerUser = (req, res) => {
    const { userId, name, email } = req.body;
    if (users.some(user => user.userId === userId)) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push({ userId, name, email, maxBookings: 3, activeBookings: 0 });
    res.json({ message: "User registered successfully" });
};

exports.getUser = (req, res) => {
    const user = users.find(user => user.userId === req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
};

exports.updateBookingCount = (req, res) => {
    const { activeBookings } = req.body;
    const user = users.find(user => user.userId === req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.activeBookings = activeBookings;
    res.json({ message: "User booking count updated", user });
};
