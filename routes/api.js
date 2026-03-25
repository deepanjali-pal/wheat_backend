const express = require("express");
const router = express.Router();

const SensorData = require("../models/SensorData");


// Send sensor data
router.post("/sensor", async (req, res) => {

    try {

        const data = new SensorData({

            temp: req.body.temp,
            humidity: req.body.humidity,
            moisture: req.body.moisture,
            pH: req.body.pH,
            rain: req.body.rain

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


// Get sensor history
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


// Latest data
router.get("/latest", async (req, res) => {

    try {

        const data = await SensorData
            .findOne()
            .sort({ timestamp: -1 });

        if (!data) {
            return res.json({
                status: "no_data",
                message: "No sensor data available"
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

module.exports = router;