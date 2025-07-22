import { useState } from "react";
import Swal from "sweetalert2";
import { requireTokenOrRedirect } from "../../utils/auth";
import FormBiometrica from "../pedidos/FormBiometrica";

const CrearMuestra = ({ user, pedidoId, tipoMuestra, observaciones = "Sin observaciones", onMuestraCreada  }) => {
    const [muestraId, setMuestraId] = useState(null);
    const token = requireTokenOrRedirect();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleCrearMuestra = async () => {
        /*const body = {
            observaciones: observaciones,
            nombrePaciente: `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
            idusuario: user._id,
            tipoMuestra: tipoMuestra,
            pedidoId: pedidoId,
        };*/
            if (!pedidoId || !user?._id) {
            console.error("❌ Pedido o usuario no válido.");
            Swal.fire("Error", "No se puede crear la muestra sin un pedido válido.", "error");
            return;
        }

        const body = {
            observaciones,
            nombrePaciente: `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
            idusuario: user._id,
            tipoMuestra,
            pedidoId,
        };

        try {
            const res = await fetch(`${apiUrl}/muestras`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "No se pudo crear la muestra");
            }

            const nuevaMuestraId = data.muestra._id;
            console.log("✅ Muestra creada con ID:", nuevaMuestraId);
            setMuestraId(nuevaMuestraId);
            if (onMuestraCreada) onMuestraCreada(nuevaMuestraId);


            Swal.fire({ title: "Muestra creada", icon: "success", timer: 1500, showConfirmButton: false });

        } catch (err) {
            console.error("❌ Error creando muestra:", err.message);
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div>
            {!muestraId ? (
                <button className="btn" onClick={handleCrearMuestra}>Tomar muestra</button>
            ) : (
                <FormBiometrica muestraId={muestraId} onSuccess={() => console.log("Resultados guardados")} />
            )}
        </div>
    );
};

export default CrearMuestra;
