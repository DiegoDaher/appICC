import express from 'express';
import {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarPedido,
  eliminarPedido,
  obtenerPedidosPorUsuario,
  actualizarEstadoMuestra
} from '../controllers/pedidosController.js';

const router = express.Router();

// Middleware para manejar errores de manera centralizada
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Rutas para pedidos
router.post('/', asyncHandler(crearPedido));
router.get('/', asyncHandler(obtenerPedidos));
router.get('/usuario/:usuarioId', asyncHandler(obtenerPedidosPorUsuario));
router.get('/:id', asyncHandler(obtenerPedidoPorId));
router.put('/:id', asyncHandler(actualizarPedido));
router.delete('/:id', asyncHandler(eliminarPedido));

// Ruta para actualizar el estado de una muestra
router.put('/:pedidoId/muestras/:muestraId/estado', asyncHandler(actualizarEstadoMuestra));

export default router;
