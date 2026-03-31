const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  temp: Number,
  humidity: Number,
  pH: Number,
  n: Number,        
  p: Number,        
  k: Number,        
  moisture: Number,
  rain: Number,
  pumpStatus: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorSchema);