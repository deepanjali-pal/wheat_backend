require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wheat_db")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Wheat Backend Running Successfully");
});

// Port
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});