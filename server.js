const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

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