<<<<<<< HEAD:BACKEND/Usuarios/controllers/usuarioController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../utils/jwtHelper');
const guardarTokenEnRedis = require('./../services/saveToke');

=======
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import { generarToken } from '../utils/jwtHelper.js';
>>>>>>> 13281fa (Reconstruccion del Microservicio Usuarios):BACKEND/Usuarios/src/controllers/usuarioController.js

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