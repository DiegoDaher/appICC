import mongoose from "mongoose";

const { Schema, model } = mongoose;

const muestraSchema = new Schema({
    tipo: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    resultados: { type: String }, // Puede ser texto o un objeto
    resultadosFinales: { type: String },
    status: { type: Boolean, default: true, required: true },
    pacienteId: { type: Schema.Types.ObjectId, ref: 'Paciente', required: true },
    pedidoId: { type: Schema.Types.ObjectId, ref: 'Pedido' },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date }
});

const Muestra = model("Muestra", muestraSchema, "muestras");

export default Muestra;