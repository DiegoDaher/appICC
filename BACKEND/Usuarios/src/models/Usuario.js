import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  correo: { type: String, unique: true, required: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'accounting', 'laboratory', 'patient'], required: true },
  nombre: { type: String, required: true },
  apellidoPaterno: String,
  apellidoMaterno: String,
  fechaNacimiento: Date,
  status: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;
