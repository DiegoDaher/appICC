# 🔐 Sistema de Manejo Automático de Errores 401

## 📋 Resumen
Este sistema intercepta automáticamente todos los errores 401 (Unauthorized) de las peticiones API y redirige al usuario al login con una alerta informativa.

## 🚀 Cómo Usar

### 1. **Para nuevas peticiones API, usa `fetchWithAuth`:**

```javascript
import { fetchWithAuth } from '../../utils/apiInterceptor';

// En lugar de fetch normal
const response = await fetchWithAuth(`${API_URL}/endpoint`, {
  method: 'GET',
  // No necesitas agregar headers de autorización manualmente
});

if (response.ok) {
  const data = await response.json();
  // Procesar datos
} else if (response.status === 401) {
  // El error 401 ya fue manejado automáticamente
  return;
} else {
  // Manejar otros errores
}
```

### 2. **Para hooks existentes:**

```javascript
import { useAuthenticatedFetch } from '../../utils/apiInterceptor';

const MyComponent = () => {
  const { fetchWithAuth } = useAuthenticatedFetch();
  
  const loadData = async () => {
    const response = await fetchWithAuth(`${API_URL}/data`);
    // ... resto del código
  };
};
```

## 🔧 Características

### ✅ **Manejo Automático:**
- **Detección de 401**: Intercepta automáticamente errores de sesión expirada
- **Limpieza de Storage**: Borra token y datos de usuario automáticamente  
- **Alerta Informativa**: Muestra mensaje "Sesión Expirada. Redirigiendo al login..."
- **Redirección Automática**: El TabNavigator detecta la falta de token y redirige

### ✅ **Headers Automáticos:**
- **Authorization**: Se agrega automáticamente desde AsyncStorage
- **Content-Type**: `application/json` por defecto
- **Accept**: `application/json` por defecto

### ✅ **Fallback de Red:**
- **Verificación Local**: Si hay error de red, verifica JWT localmente
- **Manejo de Conectividad**: No desloguea por problemas de conexión

## 📱 Flujo de Error 401

1. **Petición API** → Error 401 recibido
2. **Interceptor** → Detecta el error automáticamente
3. **Limpieza** → Borra tokens del AsyncStorage
4. **Alerta** → Muestra "Sesión Expirada. Redirigiendo al login..."
5. **Redirección** → TabNavigator detecta falta de token
6. **Login** → Usuario ve pantalla de login automáticamente

## 🎯 Archivos Actualizados

### **Nuevos:**
- `utils/apiInterceptor.js` - Sistema de interceptor principal
- `utils/401Handler.md` - Esta documentación

### **Modificados:**
- `navigation/TabNavigator.js` - Verificación real con servidor y manejo 401
- `hooks/dashboard/useSensorData.js` - Usa fetchWithAuth
- `hooks/login/useAuth.js` - Mejorado manejo de 401 en login

## 🔍 Logs de Depuración

El sistema incluye logs detallados:
- `🔐 Verificando token con el servidor...`
- `🚫 Error 401 detectado - cerrando sesión automáticamente`
- `✅ Token válido confirmado por servidor`
- `⚠️ Error de red al verificar token`

## 📈 Beneficios

- **UX Mejorada**: Manejo transparente de sesiones expiradas
- **Seguridad**: Limpieza automática de credenciales inválidas
- **Mantenibilidad**: Un solo lugar para manejar errores 401
- **Robustez**: Funciona offline con verificación local de JWT

## 💡 Próximos Pasos

Para completar la implementación, actualiza todos los hooks que hacen peticiones API para usar `fetchWithAuth` en lugar de `fetch` nativo.
