const express = require("express");
const router = express.Router();

const SensorData = require("../models/SensorData");

// -----------------------------
// PUMP STATUS VARIABLE
// -----------------------------

let pumpStatus = "OFF";

// -----------------------------
// SEND SENSOR DATA
// -----------------------------

router.post("/sensor", async (req, res) => {

    try {

        const data = new SensorData({

            temp: req.body.temp || 0,
            humidity: req.body.humidity || 0,
            moisture: req.body.moisture || 0,
            pH: req.body.pH || 0,
            npk: req.body.npk || 0,
            rain: req.body.rain || 0,
            pumpStatus: req.body.pumpStatus || pumpStatus,
            timestamp: new Date()

        });

        await data.save();

        res.json({
            status: "success",
            message: "Sensor Data Saved"
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

// -----------------------------
// GET SENSOR HISTORY
// -----------------------------

router.get("/history", async (req, res) => {

    try {

        const data = await SensorData
            .find()
            .sort({ timestamp: -1 });

        res.json(data);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });
    }

});

// -----------------------------
// LATEST SENSOR DATA
// -----------------------------

router.get("/latest", async (req, res) => {

    try {

        const data = await SensorData
            .findOne()
            .sort({ timestamp: -1 });

        if (!data) {
            return res.json({
                temp: 0,
                humidity: 0,
                moisture: 0,
                pH: 0,
                npk: 0,
                rain: 0,
                pumpStatus: pumpStatus
            });
        }

        res.json(data);

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });
    }

});
// -----------------------------
// PUMP ON
// -----------------------------

router.post("/pump/on", async (req, res) => {

    pumpStatus = "ON";

    res.json({
        status: "success",
        pumpStatus: "ON"
    });

});

// -----------------------------
// PUMP OFF
// -----------------------------

router.post("/pump/off", async (req, res) => {

    pumpStatus = "OFF";

    res.json({
        status: "success",
        pumpStatus: "OFF"
    });

});

// -----------------------------
// PUMP STATUS
// -----------------------------

router.get("/pump/status", async (req, res) => {

    res.json({
        pumpStatus: pumpStatus
    });

});

module.exports = router;