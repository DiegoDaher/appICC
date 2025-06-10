require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConfig');
const usuarioRoutes = require('./routes/usuarioRoutes');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/usuarios', usuarioRoutes);

// Puerto
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
