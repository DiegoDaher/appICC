const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controlador = require('./controlador');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/data', controlador.recibirDatos);

module.exports = app;
