import TempWet from "../models/temperatureWet.js";
const datosDispositivos = {};

// Recibe datos desde el ESP32
export const recibirDatos = (req, res) => {
    const { id, ldr } = req.body;

    console.log("Datos recibidos desde ESP32");
    console.log("ID del dispositivo:", id);
    console.log("Valor LDR:", ldr);

    // Si el dispositivo no existe, lo inicializamos
    if (!datosDispositivos[id]) {
        datosDispositivos[id] = {
            ldr: ldr,
            ldrMax: ldr,
            ldrMin: ldr,
            timestamp: new Date()
        };
    } else {
        // Actualizamos el dato actual
        datosDispositivos[id].ldr = ldr;
        datosDispositivos[id].timestamp = new Date();

        // Actualizamos el máximo y mínimo
        if (ldr > datosDispositivos[id].ldrMax) {
            datosDispositivos[id].ldrMax = ldr;
        }
        if (ldr < datosDispositivos[id].ldrMin) {
            datosDispositivos[id].ldrMin = ldr;
        }
    }

    res.status(200).json({ mensaje: "Datos recibidos correctamente" });
};

// Obtiene el último dato registrado junto con min y max
export const obtenerUltimoDato = (req, res) => {
    const id = req.params.id;

    if (datosDispositivos[id]) {
        res.status(200).json({
            id: id,
            ldr: datosDispositivos[id].ldr,
            ldrMax: datosDispositivos[id].ldrMax,
            ldrMin: datosDispositivos[id].ldrMin,
            timestamp: datosDispositivos[id].timestamp
        });
    } else {
        res.status(404).json({ mensaje: "No hay datos para este dispositivo" });
    }
};

// Resetea el max y min de un dispositivo
export const resetearMinMax = (req, res) => {
    const id = req.params.id;

    if (datosDispositivos[id]) {
        const ldrActual = datosDispositivos[id].ldr;
        datosDispositivos[id].ldrMax = ldrActual;
        datosDispositivos[id].ldrMin = ldrActual;

        res.status(200).json({
            mensaje: `Valores min y max reseteados para el dispositivo ${id}`,
            ldr: ldrActual
        });
    } else {
        res.status(404).json({ mensaje: "No hay datos para este dispositivo" });
    }
};

// Recibe y guarda los datos del dispositivo TemWet
export const registrarDatosTempWet = async (req, res) => {
  try {
    const { deviceId, ds18b20, dht11_temp, dht11_hum } = req.body;

    if (!deviceId || ds18b20 === undefined || dht11_hum === undefined) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const nuevoDato = new TempWet({
      deviceId,
      tempRecipient: ds18b20,
      tempLab: dht11_temp,
      wetLab: dht11_hum
    });

    await nuevoDato.save();
    return res.status(201).json({ mensaje: "Datos guardados correctamente" });
  } catch (error) {
    console.error("Error al guardar datos:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// Consultar datos por TempWet
export const obtenerDatosTempWet = async (req, res) => {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(400).json({ error: "Falta el deviceId en la URL" });
    }

    const datos = await TempWet.find({ deviceId }).sort({ createdAt: -1 });

    if (datos.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron datos para este deviceId" });
    }

    return res.status(200).json(datos);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};