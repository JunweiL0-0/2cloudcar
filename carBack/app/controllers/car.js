const CarModel = require('../models/Car')

exports.getAllCars = async (req, res) => {
    try {
        res.json(await CarModel.getAllCars()) // Provided all the car information
    } catch (error) {
        console.log("Error all cars", error); // Log internal server error
        res.status(500).json({ message: "Internal server error"}); // Send response status and json message
    }
}

exports.getFilteredCars = async (req, res) => {
    try {
        res.json(await CarModel.getFilteredCars(req)); // Get car data based on the constraints
    } catch (error) {
        console.log("Error getting filtered cars", error); // Log internal server error
        res.status(500).json({ message: "Internal server error"}); // Send response status and json message
    }
}