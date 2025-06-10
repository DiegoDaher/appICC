import React from 'react'

function Analisis() {
    return (
        <div className='margen'>
            <div className='buscador'>
            <input type="text" placeholder='Buscar Analisis' className='buscador' />
            <button>+Agregar</button>
            </div>
            <div className='caja_1'>
                <h1 className='titulo'>Pruebas</h1>
                <div className='prueba_tabla'>
                    <img src="/prueba-de-sangre.png" alt="prueba imagen" className='imagenes' />
                    <p className='prueba-name'>Quimica Sangiunea</p>
                    <img src="/borrar.png" alt="editar" className='iconos' />
                    <img src="/editar.png" alt="borrar" className='iconos' />
                </div>
                <hr />
            </div>
            <div className='caja_2'>
                <h1 className='titulo'>Detalles</h1>
                <h2 className='prueba-name'>Titulo</h2>
                <h2 className='prueba-name'>Costos</h2>
                <h2 className='prueba-name'>Dias de espera</h2>
                <h2 className='prueba-name'>Descripcion</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita facilis fugit inventore laborum suscipit architecto ullam ab vero et quisquam labore magni nobis aspernatur molestias ipsam, dignissimos perspiciatis temporibus soluta.
                Suscipit quo corrupti illum a sed quas eius incidunt corporis at soluta totam, amet modi qui libero odio voluptatem nihil debitis, obcaecati ab minus animi illo eos! Mollitia, rem quod.
                Nisi quae veritatis inventore sapiente harum porro at odit quis repudiandae enim, sit nostrum facere ea eveniet et magni aspernatur veniam? Reprehenderit eligendi porro ratione earum dignissimos iure repellat necessitatibus.
                Totam minima culpa alias quisquam suscipit hic reiciendis eos, ullam obcaecati optio tempora sequi aperiam vero. Expedita ea aut voluptatum molestiae beatae dolores, illo eum eveniet ex est, porro nesciunt?
                Blanditiis nulla ex, maxime perferendis dolore voluptas nisi asperiores ratione quos ipsum repellendus ut pariatur. Adipisci delectus blanditiis error quibusdam voluptas, hic, tempore deleniti deserunt ullam esse sunt ipsam aliquid!
                Facere labore consectetur dolorum, cum excepturi accusamus quod atque enim fuga quia eligendi inventore voluptatum, possimus assumenda unde nesciunt. Qui molestias asperiores eaque reiciendis ratione. Voluptatem sint ipsam doloremque voluptas.
                Ipsa maxime nihil, rem ad fugit numquam iure natus quos, distinctio perferendis laboriosam autem modi. Corrupti molestias, eveniet, ad illo soluta facere mollitia odio minus reprehenderit aliquid voluptate vel laudantium?</p>
            </div>
        </div>
    )
}

export default Analisis;
