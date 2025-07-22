import { useState } from "react";
import PacientesAlta from "../pacientes/PacientesAlta"
import DetallesPacienteAlta from "../pacientes/DetallesPacienteAlta";
import FormBiometrica from "./FormBiometrica";
import FormSanguinea from "./FormSanguinea";
import { FromMuesBiometira } from "..";
import { FormMuesSangre } from "..";
import { requireTokenOrRedirect } from "../../utils/auth";
import CargaBarras from "../elementos/CargaBarras";

/* ——— helper interno ——— */
const QS_ID = "686e0163fd380d4018dddcde";
const BH_ID = "686734c0dbf9fa679be0958c";

const ModalPedidos = ({onClose}) => {
    const [pasoActual, setPasoActual] = useState(1);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [tipoPruebaSeleccionado, setTipoPruebaSeleccionado] = useState(null);
    const [loadingPedido, setLoadingPedido] = useState(false);

    
    const [/*pedidoId*/,  setPedidoId]  = useState(null); 
    const [muestraId, setMuestraId] = useState(null); 
    
    const avanzarPaso = () => setPasoActual(prev => prev + 1);
    const retrocederPaso = () => setPasoActual(prev => prev - 1);

    /**  POST /muestras   (genera “muestra vacía”) */
    const crearMuestraBase = async (paciente, tipo, pedidoId) => {
        const token = requireTokenOrRedirect();
        const apiUrl = process.env.REACT_APP_API_URL;

        const body = {
        observaciones: "",
        nombrePaciente: paciente?.nombre || "-",
        idusuario: paciente?._id,
        tipoMuestra: tipo === BH_ID ? "biometriaHematica" : "quimicaSanguinea",
        pedidoId,
        };

        const res = await fetch(`${apiUrl}/muestras`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("No se pudo crear la muestra");

        const { _id } = await res.json(); // ajusta según tu backend
        return _id;
    };
    /*_____________________paso 3: formulario de pedido_____________________*/
    const renderFormPedido = () => {
        /** callback común: 1.- guarda pedido  2.- crea muestra  3.- pasa a paso */
        const handleSuccess = async (nuevoPedidoId) => {
        try {
            setLoadingPedido(true);
            setPedidoId(nuevoPedidoId);

        const id = await crearMuestraBase(
            pacienteSeleccionado,
            tipoPruebaSeleccionado,
            nuevoPedidoId
            );
            setMuestraId(id);
            avanzarPaso();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoadingPedido(false); // termina loading
        }
        };
        const commonProps = {
        fixedUserId: pacienteSeleccionado,
        onSuccess: handleSuccess,
        };
        switch (tipoPruebaSeleccionado) {
        case BH_ID:
            return <FormBiometrica {...commonProps} />;
        case QS_ID:
            return <FormSanguinea {...commonProps} />;
        default:
            return <p>Selecciona una prueba válida</p>;
        }
    };

    /*__________________paso 4: formulario de resultados__________________*/
    const renderFormResultados = () => {
        if (!muestraId) {
        return (
            <div className="scale-up-ver-center">
            <CargaBarras className="plantilla" />
            </div>
        );
        }
        switch (tipoPruebaSeleccionado) {
        case BH_ID:
            return (
            <FromMuesBiometira
                muestraId={muestraId}
                onSuccess={onClose}
            />
            );
        case QS_ID:
            return (
            <FormMuesSangre
                muestraId={muestraId}
                onSuccess={onClose}
            />
            );
        default:
            return <p>Selecciona una prueba válida</p>;
        }
    };
    return(
        <div className="modal-overlay">
            {pasoActual === 1 && (
                <div className="scale-in-hor-center">
                    <div className="modal-content">
                        <div >
                            <button className="close-btn" onClick={onClose}>x</button>
                            <p className='titulo'>Registrar Pedido</p>
                            <p>Selecione el paciente:</p>
                            <div className="modal-arreglado">
                                <button className="btn-modal" onClick={avanzarPaso}disabled={!pacienteSeleccionado}>Siguiente</button>
                            </div>
                            <PacientesAlta seleccionado={pacienteSeleccionado} onSelect={id => setPacienteSeleccionado(id)}/>
                        </div>
                    </div>
                </div>
            )}
            {pasoActual === 2 && (
                <div className="scale-in-hor-center">
                    <div className="modal-content">
                        <p className='titulo'>Registrar Pedido</p>
                        <button className="close-btn" onClick={onClose}>x</button>
                        <p>Selecione el tipo de prueba:</p>
                            <div className="modal-arreglado">
                            <button className="btn" onClick={avanzarPaso} disabled={!tipoPruebaSeleccionado}>Siguiente</button>
                            <button className="btn" onClick={retrocederPaso}>Regresar</button>
                            </div>
                        <div>
                        <DetallesPacienteAlta seleccionado={tipoPruebaSeleccionado} onSelect={prueba => setTipoPruebaSeleccionado(prueba)}/>
                        </div>
                        
                    </div>
                </div>
            )}
            {pasoActual === 3 && (
                <div className="scale-in-hor-center">
                <div className="modal-content">
                    <p className="titulo">Registrar Pedido</p>
                    <button className="close-btn" onClick={onClose}>
                    x
                    </button>
                    {renderFormPedido()}
                    <div>
                    <button className="btn" onClick={avanzarPaso} disabled={!tipoPruebaSeleccionado ||loadingPedido}>{loadingPedido ? "Cargando..." : "Siguiente"}</button>
                    <button className="btn" onClick={retrocederPaso}>Regresar</button>
                    </div>
                </div>
                </div>
            )}
            {/* Paso 4 */}
            {pasoActual === 4 && (
                <div className="modal-content scale-in-hor-center">
                <button className="close-btn" onClick={onClose}>x</button>
                <p className="titulo">Registrar muestra</p>
                {renderFormResultados()}
                </div>
            )}
            </div>
    )
}

export default ModalPedidos
