import Analisis from './../models/analisismodel.js';

export const getAllAnalysis = async (req, res) => {
    const analisysList = await Analisis.find();
    return res.json({ analisysList });
}

export const saveAnalysis = async (req, res) => {
    const { nombre, costo, diasEspera, descripcion } = req.body;
    
    const newAnalysis = new Analysis({
        nombre, 
        costo,
        diasEspera, 
        descripcion
    });

    const analysisSaved = await newAnalysis.save();
    return res.status(201).json({
        message: "Analisis guardado", User: userSaved})
}

export const deleteAnalysis = async(req, res) => {
    const { analisysId } = req.params;

    const analisis = await Analisis.findById(analisysId);
    if (!analisis){
        return res.status(404).json({ message: "Analisis no encontrado."});
    }

    analisis.status=false;
    analisis.deleteDate= new Date;

    const deleteAnalysis = await analisis.save();
    return res.json({ deleteAnalysis });
}

export const updateAnalisys = async (req, res) => {
    const { analisysId } = req.params;
    const { nombre, costo, diasEspera, descripcion } = req.body;
    
    const analisis = await Analisis.findById(analisysId);
    if (!analisis){
        return res.status(404).json({ message: "Analisis no encontrado."});
    }

    analisis.nombre = nombre != null ? nombre : analisis.nombre;
    analisis.costo = costo != null ? costo : analisis.costo;
    analisis.diasEspera=diasEspera != null ? diasEspera : analisis.diasEspera;
    analisis.descripcion=descripcion != null ? descripcion : analisis.descripcion;

    const updateAnalisis = await analisis.save();
    return res.json({ updateAnalisis });
}