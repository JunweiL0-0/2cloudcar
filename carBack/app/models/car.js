const CarSchema = require('../mongoSchema/Car')

exports.getAllCars = async function(){
    try {
        return await CarSchema.find({}); // Retrieve all the car information
    } catch (error) {
        console.log("Error getting all cars", error); // Log internal error
        res.status(500).json({ message: "Internal server error"}); // Send response status and set the error message
    }
}

exports.getFilteredCars = async function(req){
    try {
        const {brand, year, model, carType, title, usedOrNew, transmission, engine, driveType, fuelType,
            fuelConsumption,kilometres, colourExtInt, location, cylindersinEngine, bodyType, doors, seats, price} = req.query;
        const filters = {};

        // Loop through and construct filter object
        for (const [key, value] of Object.entries(req.query)) {
            if (value) { // Ensure value not empty
                if (key === 'year' || key === 'kilometres' || key === 'cylindersinEngine' || key === 'doors' || key === 'seats' || key === 'price') {
                    filters[key.charAt(0).toUpperCase() + key.slice(1)] = parseInt(value); // If keys are number
                } else {
                    filters[key.charAt(0).toUpperCase() + key.slice(1)] = value; // otherwise
                }
            }
        }

        const result = await CarSchema.find(filters); // Apply filter and retrieve data from mongodb
        return result;
    } catch (error) {
        console.log("Error getting filtered cars", error); // Log internal error
        res.status(500).json({ message: "Internal server error"}); // Send response status and set the error message
    }
}