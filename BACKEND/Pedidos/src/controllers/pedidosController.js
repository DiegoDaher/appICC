import Pedido from '../models/pedidoModel.js';
import { validationResult } from 'express-validator';

export const crearPedido = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Datos de entrada no válidos');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  try {
    const { usuarioId, analisis, muestras, descuento, direccionEntrega, notas } = req.body;
    
    if (!analisis || analisis.length === 0) {
      const error = new Error('Debe incluir al menos un análisis en el pedido');
      error.statusCode = 400;
      throw error;
    }
    
    const subtotal = analisis.reduce((sum, analisisItem) => {
      if (!analisisItem.precio || isNaN(analisisItem.precio)) {
        throw new Error(`Precio inválido para el análisis: ${analisisItem.nombre || 'sin nombre'}`);
      }
      return sum + parseFloat(analisisItem.precio);
    }, 0);
    
    const descuentoConfig = descuento || { tipo: 'porcentaje', porcentaje: 0, monto: 0 };
    
    const nuevoPedido = new Pedido({
      usuarioId,
      analisis,
      muestras: muestras || [],
      subtotal,
      descuento: descuentoConfig,
      total: 0, 
      direccionEntrega,
      notas,
      estado: 'creado'
    });

    // Calcular el total con descuento
    nuevoPedido.total = nuevoPedido.calcularTotal();
    
    const pedidoGuardado = await nuevoPedido.save();
    
    
    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      data: pedidoGuardado
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {
  try {
    const { usuarioId, estado } = req.query;
    const query = {};
    
    if (usuarioId) query.usuarioId = usuarioId;
    if (estado) query.estado = estado;
    
    const pedidos = await Pedido.find(query)
      .sort({ fechaCreacion: -1 });
    
    res.status(200).json({
      success: true,
      count: pedidos.length,
      data: pedidos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los pedidos',
      error: error.message
    });
  }
};

// Obtener un pedido por ID
export const obtenerPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pedido = await Pedido.findById(id);
    
    if (!pedido) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: pedido
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el pedido',
      error: error.message
    });
  }
};

// Actualizar un pedido
export const actualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizacion = req.body;
    
    // Si se actualizan los análisis, recalcular el subtotal
    if (actualizacion.analisis) {
      actualizacion.subtotal = actualizacion.analisis.reduce(
        (sum, analisisItem) => sum + analisisItem.precio, 0
      );
    }
    
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { 
        ...actualizacion,
        ...(actualizacion.analisis || actualizacion.descuento ? 
          { total: 0 } : {}) 
      },
      { new: true, runValidators: true }
    );
    
    if (!pedidoActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }
    
    if (actualizacion.analisis || actualizacion.descuento) {
      pedidoActualizado.total = pedidoActualizado.calcularTotal();
      await pedidoActualizado.save();
    }
    
    res.status(200).json({
      success: true,
      data: pedidoActualizado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el pedido',
      error: error.message
    });
  }
};

// Eliminar un pedido (borrado lógico)
export const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { $set: { status: false } },
      { new: true }
    );
    
    if (!pedidoActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Pedido eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el pedido',
      error: error.message
    });
  }
};

// Obtener pedidos por usuario
export const obtenerPedidosPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    
    const pedidos = await Pedido.find({ usuarioId })
      .sort({ fechaCreacion: -1 });
    
    res.status(200).json({
      success: true,
      count: pedidos.length,
      data: pedidos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los pedidos del usuario',
      error: error.message
    });
  }
};

// Actualizar estado de una muestra
export const actualizarEstadoMuestra = async (req, res) => {
  try {
    const { pedidoId, muestraId } = req.params;
    const { estado } = req.body;
    
    const pedido = await Pedido.findById(pedidoId);
    
    if (!pedido) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }
    
    const muestra = pedido.muestras.id(muestraId);
    
    if (!muestra) {
      return res.status(404).json({
        success: false,
        message: 'Muestra no encontrada en el pedido'
      });
    }
    
    muestra.estado = estado;
    await pedido.save();
    
    res.status(200).json({
      success: true,
      data: muestra
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el estado de la muestra',
      error: error.message
    });
  }
};