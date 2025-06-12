import { Router } from 'express';
import {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  obtenerUsuarios
} from '../controllers/usuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/profile', authMiddleware, obtenerPerfil);
router.get('/', obtenerUsuarios);

export default router;