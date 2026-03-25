const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
    temp: Number,
    humidity: Number,
    moisture: Number,
    pH: Number,
    rain: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorSchema);