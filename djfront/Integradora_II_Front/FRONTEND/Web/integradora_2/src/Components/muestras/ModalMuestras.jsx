import React, { useEffect, useState } from 'react';
import PacientesAlta from '../pacientes/PacientesAlta';
import DetallesPacienteAlta from '../pacientes/DetallesPacienteAlta';
import { FromMuesBiometira } from '..';
import { FormMuesSangre } from '..';
import { requireTokenOrRedirect } from "../../utils/auth";
import CrearMuestra from './CrearMuestra';
import IdPedidos from './IdPedidos';

const ModalMuestras = ({ onClose }) => {
  const [paso, setPaso] = useState(1);
  const avanzar = () => setPaso((p) => p + 1);
  const retroceder = () => setPaso((p) => p - 1);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [analisisId, setAnalisisId] = useState(null);
  const [muestraId, setMuestraId] = useState(null);
  const [pedidosPaciente, setPedidosPaciente] = useState([]);
  const [observaciones, setObs] = useState("");
  const [pedidoId, setPedidoId] = useState("");

  const [mostrarCrear, setMostrarCrear] = useState(false); // ✅ agregado

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = requireTokenOrRedirect();

  // ✅ Cargar pedidos del paciente
  useEffect(() => {
    if (!pacienteSeleccionado) return;

    const cargarPedidos = async () => {
      try {
        const res = await fetch(`${apiUrl}/pedidos/${pacienteSeleccionado._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al obtener pedidos");

        const pedidos = Array.isArray(data.data) ? data.data : [data.data].filter(Boolean);
        setPedidosPaciente(pedidos);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setPedidosPaciente([]);
      }
    };

    cargarPedidos();
  }, [apiUrl, pacienteSeleccionado, token]);

  // ✅ Determinar tipo de muestra dinámicamente
  const tipoMuestra = (() => {
    const pedido = pedidosPaciente.find(p => p._id === pedidoId);
    return pedido?.analisis?.[0]?.nombre === "Biometría Hemática"
      ? "biometriaHematica"
      : "quimicaSanguinea";
  })();

  // ✅ Mostrar resultados según tipo de análisis
  const renderResultados = () => {
    const pedido = pedidosPaciente.find(p => p._id === pedidoId);
    const tipo = pedido?.analisis?.[0]?.nombre;

    if (tipo === "Biometría Hemática") {
      return <FromMuesBiometira muestraId={muestraId} onSuccess={onClose} />;
    }

    if (tipo === "Química Sanguínea") {
      return <FormMuesSangre muestraId={muestraId} onSuccess={onClose} />;
    }

    return <p>Tipo de muestra no válido</p>;
  };

  return (
    <div className="modal-overlay">
      <div className="scale-in-hor-center">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>×</button>

          {/* PASO 1 - Paciente */}
          {paso === 1 && (
            <>
              <p className="titulo">Paciente</p>
              <div className='modal-arreglado'>
                <button className="btn" onClick={avanzar} disabled={!pacienteSeleccionado}>Siguiente</button>
              </div>
              <PacientesAlta seleccionado={pacienteSeleccionado} onSelect={setPacienteSeleccionado} />
            </>
          )}

          {/* PASO 2 - Tipo de muestra */}
          {paso === 2 && (
            <>
              <p className="titulo">Tipo de muestra</p>
              <div className='modal-arreglado'>
                <button className="btn" onClick={avanzar} disabled={!analisisId}>Siguiente</button>
                <button className="btn" onClick={retroceder}>Regresar</button>
              </div>
              <DetallesPacienteAlta seleccionado={analisisId} onSelect={setAnalisisId} />
            </>
          )}

          {/* PASO 3 - Tomar muestra */}
          {paso === 3 && (
            <div className="form-field">
              <p className="titulo">Tomar muestra</p>

              <div className="form-field">
                <label>Observaciones</label>
                <textarea value={observaciones} onChange={(e) => setObs(e.target.value)} />
              </div>

              <div className="form-field">
                <label>Selecciona un pedido asociado</label>
                <IdPedidos
                  seleccionado={pedidoId}
                  analisisIdFiltro={analisisId}
                  onSelect={setPedidoId}
                />
              </div>

              <button
                className="btn"
                disabled={!pedidoId}
                onClick={() => setMostrarCrear(true)}
              >
                Tomar muestra
              </button>

              {/*mostrarCrear && (
                <CrearMuestra
                  user={pacienteSeleccionado}
                  pedidoId={pedidoId}
                  tipoMuestra={tipoMuestra}
                  observaciones={observaciones}
                  onMuestraCreada={(id) => {
                    setMuestraId(id);
                    avanzar();
                  }}
                />
              )*/}
              {mostrarCrear (
                <CrearMuestra
                  user={pacienteSeleccionado}
                  pedidoId={pedidoId}
                  tipoMuestra={tipoMuestra}
                  observaciones={observaciones}
                  onMuestraCreada={(id) => {
                    setMuestraId(id);
                    avanzar();
                  }}
                />
              )}
              <button
                className="btn"
                disabled={!pedidoId}
                onClick={() => {
                if (!pedidoId) {
                alert("Selecciona un pedido válido antes de continuar.");
                return;
                }
                setMostrarCrear(true);
                }}
                >
                Tomar muestra
              </button>


              <div style={{ marginTop: "1rem" }}>
                <button className="btn" onClick={retroceder}>Regresar</button>
              </div>
            </div>
          )}

          {/* PASO 4 - Resultados */}
          {paso === 4 && (
            <>
              <p className="titulo">Resultados</p>
              {renderResultados()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalMuestras;
