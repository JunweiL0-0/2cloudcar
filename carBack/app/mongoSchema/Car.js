const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    Brand: { type: String, required: true },       // CSV: Brand
    Year: { type: Number, required: true },        // CSV: Year
    Model: { type: String, required: true },       // CSV: Model
    CarType: { type: String },                     // CSV: Car/Suv
    Title: { type: String },                       // CSV: Title
    UsedOrNew: { type: String },                   // CSV: UsedOrNew
    Transmission: { type: String },                // CSV: Transmission
    Engine: { type: String },                      // CSV: Engine
    DriveType: { type: String },                   // CSV: DriveType
    FuelType: { type: String },                    // CSV: FuelType
    FuelConsumption: { type: String },             // CSV: FuelConsumption
    Kilometres: { type: Number },                  // CSV: Kilometres
    ColourExtInt: { type: String },                // CSV: ColourExtInt
    Location: { type: String },                    // CSV: Location
    CylindersInEngine: { type: Number },           // CSV: CylindersinEngine
    BodyType: { type: String },                    // CSV: BodyType
    Doors: { type: Number },                       // CSV: Doors
    Seats: { type: Number },                       // CSV: Seats
    Price: { type: Number, required: true },       // CSV: Price
});

module.exports = mongoose.model('Car', carSchema);