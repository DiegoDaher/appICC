/*export function getToken() {
    return localStorage.getItem('token');
}
export function requireTokenOrRedirect() {
    const token = getToken();
    if (!token) {
        window.location.href = '/'; // o usa navigate si usas react-router
        return null;
    }
    return token;
}*/

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function requireTokenOrRedirect() {
    const token = getToken();
    if (!token) {
        window.location.href = '/';  // login
    }
    return token;
}
