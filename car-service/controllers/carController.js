let cars = []; 

exports.addCar = (req, res) => {
    const { carId, model, location } = req.body;
    if (cars.some(car => car.carId === carId)) {
        return res.status(400).json({ message: "Car already exists" });
    }
    cars.push({ carId, model, location, isAvailable: true });
    res.json({ message: "Car added successfully" });
};

exports.getCar = (req, res) => {
    const car = cars.find(car => car.carId === req.params.carId);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
};

exports.updateAvailability = (req, res) => {
    const { isAvailable } = req.body;
    const car = cars.find(car => car.carId === req.params.carId);
    if (!car) return res.status(404).json({ message: "Car not found" });
    car.isAvailable = isAvailable;
    res.json({ message: "Car availability updated", car });
};
