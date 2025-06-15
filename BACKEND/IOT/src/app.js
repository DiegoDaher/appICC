const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controlador = require('./controller/controlador');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/data', controlador.recibirDatos);
app.get('/data/:id', controlador.obtenerUltimoDato);
app.delete('/data/:id', controlador.resetearMinMax);

module.exports = app;
