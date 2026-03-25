const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Replace with your URI)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/wheat_db')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
// Adding '0.0.0.0' tells the server to listen to ANY device on your network
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is live at http://0.0.0.0:${PORT}`);
});