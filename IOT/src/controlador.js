exports.recibirDatos = (req, res) => {
    const { id, ldr } = req.body;

    console.log("Datos recibidos desde ESP32");
    console.log("ID del dispositivo:", id);
    console.log("Valor LDR:", ldr);

    res.status(200).json({ mensaje: "Datos recibidos correctamente" });
};
