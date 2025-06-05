const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/profile', authMiddleware, usuarioController.obtenerPerfil);

module.exports = router;
