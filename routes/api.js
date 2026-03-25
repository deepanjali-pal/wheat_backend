const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// POST: Receives data from NodeMCU
router.post('/update', async (req, res) => {
    try {
        const newData = new SensorData(req.body);
        await newData.save();
        res.status(200).json({ message: "Data Saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Sends latest data to Flutter App
router.get('/latest', async (req, res) => {
    try {
        const latest = await SensorData.findOne().sort({ timestamp: -1 });
        res.json(latest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;