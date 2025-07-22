/*const DetallesPacienteAlta = ({seleccionado,onSelect = () => {}}) => {

    const pruebas = [
        { id: 'qs', nombre: 'Química Sanguínea', precio: 350 },
        { id: 'bh', nombre: 'Biométrica Hepática', precio: 211 },
    ];
    
    return (
        <div className="caja_2">
        <h1 className="titulo">Detalles</h1>
        {pruebas.map((p, index)=> {
            const isSelected = seleccionado === p.id;
            return (
                <div key={index} className='tabla-detalles'>
                <div
                    key={p.id}
                    className={`prueba_tabla ${isSelected ? 'seleccionado' : ''}`}
                    onClick={(e) =>{e.stopPropagation(); onSelect(p.id)} }  
                >   
                    <div className="icono">
                    <img src="/prueba-de-sangre.png" alt="prueba" className="imagen-prueba" />
                    </div>
                    <p className="prueba-name">{p.nombre}</p>
                    <div className="acomodar-iconos-2">
                    <img src="/descargas.png" alt="descargar" className="icono-correo" />
                    </div>
                </div>
                </div>
            );
        })}
        </div>
    )
}
export default DetallesPacienteAlta*/
// DetallesPacienteAlta.jsx
const DetallesPacienteAlta = ({ seleccionado, onSelect = () => {} }) => {
    const pruebas = [
        {
        id      : "686e0163fd380d4018dddcde",   // ← ID real Química sanguínea
        tipo    : "qs",
        nombre  : "Química Sanguínea",
        precio  : 120,
        },
        {
        id      : "686734c0dbf9fa679be0958c",   // ← ID real BH
        tipo    : "bh",
        nombre  : "Biometría Hemática",
        precio  : 350,
        },
    ];

    return (
        <div className="caja_2">
        <h1 className="titulo">Detalles</h1>

        {pruebas.map((p) => {
            const isSelected = seleccionado === p.id;
            return (
            <div key={p.id} className="tabla-detalles">
                <div
                className={`prueba_tabla ${isSelected ? "seleccionado" : ""}`}
                onClick={() => onSelect(p.id)}   // ← enviamos el ID real
                >
                <div className="icono">
                    <img src="/prueba-de-sangre.png" alt="" className="imagen-prueba" />
                </div>
                <p className="prueba-name">{p.nombre}</p>
                </div>
            </div>
            );
        })}
        </div>
    );
};
export default DetallesPacienteAlta;
