import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import { generarToken } from '../utils/jwtHelper.js';
import { guardarTokenEnRedis } from './../services/saveToke.js';

export const registrarUsuario = async (req, res) => {
  const { correo, contraseña, rol, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const contraseñaHasheada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      correo,
      contraseña: contraseñaHasheada,
      rol,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento
    });

    await nuevoUsuario.save();

    const token = generarToken(nuevoUsuario);
    //Guardamos token
    await guardarTokenEnRedis(nuevoUsuario._id.toString(), token);
    res.status(201).json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error registrando usuario', error });
  }
};

export const loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ message: 'Correo o contraseña inválidos' });
    }
  
    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(400).json({ message: 'Correo o contraseña inválidos' });
    }
    
    if(!usuario.status){
      return res.status(400).json({ message: 'Cuenta dada de baja' });
    }

    const token = generarToken(usuario);
    
    //Guardamos token
    await guardarTokenEnRedis(usuario._id.toString(), token);
  
    res.json({ login: "successful", token, usuario });
    //res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error en login', error });
  }
};

export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-contraseña');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo perfil', error });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuariosList = await Usuario.find();
    res.json(usuariosList);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios', error });
  }
};

export const deleteUsuario = async (req, res) => {
  const { userId } = req.params;

  try{
    const usuario = await Usuario.findById(userId);
    if (!usuario){
        return res.status(404).json({ message: "Analisis no encontrado."});
    }

    usuario.status=false;
    usuario.deleteDate= new Date;

    const deleteUser = await usuario.save();
    return res.json({ deleteUser });

  }catch(error){
    return res.status(404).json({ message:"Error al dar de baja" })
  }
}

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { correo, contraseña, rol, ateriorContraseña } = req.body;

  const usuario = await Usuario.findById(userId);
  if (!usuario) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (!usuario.status) {
    return res.status(400).json({ message: 'Cuenta deshabilitada por baja' });
  }
  
  const esValida = await bcrypt.compare(ateriorContraseña, usuario.contraseña);
  if (!esValida) {
    return res.status(400).json({ message: 'Credenciales incorrectas' });
  }
  if (correo !== undefined && correo !== null){
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }
    usuario.correo = correo != null ? correo : usuario.correo;
  }
  

  // Cambio de contraseña solo si viene una nueva
  if (contraseña !== undefined && contraseña !== null) {
    
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(contraseña, salt);
  }

  usuario.rol = rol != null ? rol : usuario.rol;

  const updateUser = await usuario.save();
  return res.json({ updateUser });
}
