// models/Sensor.js (Isse update karein)
const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  temp: Number,
  humidity: Number,
  pH: Number,
  n: Number,         // Nitrogen
  p: Number,         // Phosphorus
  k: Number,         // Potassium
  moisture: Number,  // Soil Moisture
  rain: Number,      // Rain Status (0 or 1)
  battery: Number,
  pumpStatus: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sensor', SensorSchema);