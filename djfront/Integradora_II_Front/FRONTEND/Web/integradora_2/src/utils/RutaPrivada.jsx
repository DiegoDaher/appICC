import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getToken } from './auth';

/**
 * Envuelve cualquier conjunto de rutas que requieran sesión.
 * Si no existe token, redirige al login conservando la URL
 * a la que el usuario intentó acceder (state.from).
 */
const RutaPrivada = () => {
    const location = useLocation();
    const token = getToken();

    return token
    ? <Outlet />                                  // pinta la sub‑ruta protegida
    : <Navigate to="/" state={{ from: location }} replace />;
};

export default RutaPrivada;
