import mongoose from 'mongoose';

const { Schema } = mongoose;

const AnalisisPedidoSchema = new mongoose.Schema({
  analisisId: {
    type: Schema.Types.ObjectId,
    ref: 'Analisis',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  descripcion: String
});

const MuestraSchema = new mongoose.Schema({
  muestraId: {
    type: Schema.Types.ObjectId,
    ref: 'Muestra',
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  fechaRecoleccion: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['pendiente', 'recolectada', 'en_analisis', 'completada'],
    default: 'pendiente'
  }
});

const DescuentoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    uppercase: true
  },
  porcentaje: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  monto: {
    type: Number,
    min: 0,
    default: 0
  },
  tipo: {
    type: String,
    enum: ['porcentaje', 'monto_fijo'],
    default: 'porcentaje'
  }
});

const PedidoSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['creado', 'en_proceso', 'completado', 'cancelado'],
    default: 'creado'
  },
  analisis: [AnalisisPedidoSchema],
  muestras: [MuestraSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  descuento: DescuentoSchema,
  total: {
    type: Number,
    required: true,
    min: 0
  },
  notas: String,
  direccionEntrega: {
    calle: String,
    ciudad: String,
    estado: String,
    codigoPostal: String,
    pais: String
  }
}, {
  timestamps: true
});

PedidoSchema.pre('save', function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

PedidoSchema.methods.calcularTotal = function() {
  let total = this.subtotal;
  
  if (this.descuento) {
    if (this.descuento.tipo === 'porcentaje') {
      total = total * (1 - (this.descuento.porcentaje / 100));
    } else if (this.descuento.tipo === 'monto_fijo') {
      total = Math.max(0, total - this.descuento.monto);
    }
  }
  
  return parseFloat(total.toFixed(2));
};

const Pedido = mongoose.model('Pedido', PedidoSchema);

export default Pedido;
