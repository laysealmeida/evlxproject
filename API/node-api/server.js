const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
var mongoDB = 'mongodb://localhost:27017/nodeapi';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


requireDir('./src/models')

app.use('/api', require('./src/routes'))

app.listen(3001); 
