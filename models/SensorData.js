const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  temp: Number,
  humidity: Number,
  ph: Number,
  n: Number,        // Ye add karna zaroori hai
  p: Number,        // Ye bhi add karein
  k: Number,        // Ye bhi add karein
  moisture: Number,
  rain: Number,
  pumpStatus: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorSchema);