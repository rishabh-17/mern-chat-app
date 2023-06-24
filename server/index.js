const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./router/userRoutes')
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', userRoutes);


// database Connection
mongoose.connect('mongodb://127.0.0.1:27017/chat');


// server start
app.listen(5000,() => {
    console.log("listening on port localhost//:5000");
})