import Muestra from '../models/muestrasmodel.js';

// Obtener todas las muestras
export const getAllMuestras = async (req, res) => {
    const muestrasList = await Muestra.find();
    return res.json({ muestrasList });
};

// Guardar nueva muestra
export const saveMuestra = async (req, res) => {
    const { tipo, fechaInicio, resultados, resultadosFinales, pacienteId, pedidoId } = req.body;

    if (!tipo || !fechaInicio || !pacienteId) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    try {
        const nuevaMuestra = new Muestra({
            tipo, fechaInicio, resultados, resultadosFinales, pacienteId, pedidoId
        });
        const muestraGuardada = await nuevaMuestra.save();
        return res.status(201).json({ message: "Muestra guardada", muestra: muestraGuardada });
    } catch (error) {
        return res.status(500).json({ message: "Error al guardar muestra", error });
    }
};

// Eliminar (soft delete)
export const deleteMuestra = async (req, res) => {
    const { muestraId } = req.params;
    const muestra = await Muestra.findById(muestraId);
    if (!muestra) return res.status(404).json({ message: "Muestra no encontrada" });

    muestra.status = false;
    muestra.deleteDate = new Date();
    await muestra.save();
    return res.json({ message: "Muestra eliminada", muestra });
};

// Actualizar muestra
export const updateMuestra = async (req, res) => {
    const { muestraId } = req.params;
    const { tipo, fechaInicio, resultados, resultadosFinales, status } = req.body;
    const muestra = await Muestra.findById(muestraId);
    if (!muestra) return res.status(404).json({ message: "Muestra no encontrada" });

    muestra.tipo = tipo ?? muestra.tipo;
    muestra.fechaInicio = fechaInicio ?? muestra.fechaInicio;
    muestra.resultados = resultados ?? muestra.resultados;
    muestra.resultadosFinales = resultadosFinales ?? muestra.resultadosFinales;
    muestra.status = status ?? muestra.status;

    const muestraActualizada = await muestra.save();
    return res.json({ message: "Muestra actualizada", muestra: muestraActualizada });
};

// Buscar por ID
export const getMuestraById = async (req, res) => {
    const { muestraId } = req.params;
    const muestra = await Muestra.findById(muestraId);
    if (!muestra) return res.status(404).json({ message: "Muestra no encontrada" });
    return res.json({ muestra });
};