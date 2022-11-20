require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const app = express();
const router = require('./routes/userRoutes');
app.use(express.json());
// app.use(express.urlencoded());

app.use('/',router);

module.exports = app;