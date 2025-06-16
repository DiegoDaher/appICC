//rfce para hacer una plantilla
import React from 'react'
import { Link } from 'react-router-dom';

const Pacientes =() => {

    
    const nombres = [/*esta madre es para hacer nuestra lista */
    "Mario Lira Zamora",
    "David Jezhuah Ramirez Alvarado",
    "Racardo Luna Unzueta",
    "Diego Daher Diaz Contreraz"
    ];

    const pruebas = [
        "Quimica sanguinea",
        "Biometrica Hepatica"
    ]

    /*  Posible version con backend listo
    const [pacientes, setPacientes] = useState([]);
    useEffect(() => {
    axios.get("http://localhost:3000/api/pacientes")
        .then(response => setPacientes(response.data))
        .catch(error => console.error(error));
    }, []);

    */
    return (
            <div className='margen'>
                <div className='buscador'>
                    <input type="text" placeholder='Buscar Paciente' className='buscador' />
                    <Link to="/Registrar-paciente">
                    <button className='btn-agregar'>+Agregar</button>
                    </Link>
                    <p className='prueba-name'>asa</p>
                </div>
            <div>
                </div>
                <div className='scale-up-ver-center'>
                    <div className='caja_1'>
                        <div className='scroll'>
                            {nombres.map((nombreCompleto,index) => {/*se usa map para iterar la lista y generar un bloque prueba_tabla por cada nombre tambien la usare en chechbox*/
                                const inicial = nombreCompleto.charAt(0);/*se obtiene la inicial con .charAt(0) para cada nombre dentro del map. recordar esta mamada*/
                                return(
                                    <div key={index} className='prueba_tabla'>{/*cada hijo renderizado con map debe tener una key, por eso usé el índice index. */}
                                        <div className='inicial-circulo'>
                                            {inicial}
                                        </div>
                                        <div>
                                            <p className='prueba-name'>{nombreCompleto}</p>                                
                                        </div>
                                        <div className='acomodar-iconos'>
                                            <img src="/basura.png" alt="borrar" className='iconos' />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='scale-up-ver-center'>
                    <div className='caja_2'>
                        <h1 className='titulo'>Detalles</h1>
                        
                            {/**aqui empieza lo chido */}
                            {pruebas.map((prueba, index) => (
                                <div key={index} className='tabla-detalles'>
                                <div className='icono'>
                                    <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                                </div>
                                <p className='prueba-name'>{prueba}</p>
                                <div className='acomodar-iconos'>
                                    <img src="/sobre-mas.png" alt="editar" className='iconos' />
                                </div>
                                <div className='acomodar-iconos-2'>
                                    <img src="/descargas.png" alt="borrar" className='iconos' />
                                </div>
                                </div>
                            ))}
                            
                </div>
                </div>
            </div>
    )
}

export default Pacientes;
