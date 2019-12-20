const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const bodyParser = require('body-parser')
const http = require('http').createServer(app);




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));