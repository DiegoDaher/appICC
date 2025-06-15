const datosDispositivos = {};

// Recibe datos desde el ESP32
exports.recibirDatos = (req, res) => {
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
exports.obtenerUltimoDato = (req, res) => {
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
exports.resetearMinMax = (req, res) => {
    const id = req.params.id;

    if (datosDispositivos[id]) {
        // Al resetear, ponemos el actual como nuevo min y max
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
