const express = require("express");
const router = express.Router();
const SensorData = require("../models/SensorData");

let pumpStatus = "OFF";

// SEND SENSOR DATA (NodeMCU isi path par data bhej raha hai)
router.post("/sensor", async (req, res) => {
    try {
        const data = new SensorData({
            temp: req.body.temp || 0,
            humidity: req.body.humidity || 0,
            moisture: req.body.moisture || 0,
            pH: req.body.pH || 0,
            n: req.body.n || 0,
            p: req.body.p || 0,
            k: req.body.k || 0,
            rain: req.body.rain || 0,
            pumpStatus: pumpStatus,
            timestamp: new Date()
        });
        await data.save();
        res.json({ status: "success", message: "Sensor Data Saved" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// GET LATEST DATA (App ke liye)
router.get("/latest", async (req, res) => {
    try {
        const data = await SensorData.findOne().sort({ timestamp: -1 });
        res.json(data || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUMP CONTROLS
router.post("/pump/on", (req, res) => { pumpStatus = "ON"; res.json({ pumpStatus: "ON" }); });
router.post("/pump/off", (req, res) => { pumpStatus = "OFF"; res.json({ pumpStatus: "OFF" }); });
router.get("/pump/status", (req, res) => { res.json({ pumpStatus: pumpStatus }); });

module.exports = router;