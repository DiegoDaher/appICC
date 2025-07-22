# Hooks Architecture

Esta carpeta contiene todos los hooks personalizados organizados por funcionalidad para mejorar la reutilización y el mantenimiento del código.

## Estructura

```
hooks/
├── index.js                 # Exportaciones principales
├── auth/                    # Hooks de autenticación y perfil
│   ├── index.js
│   ├── useEditarPerfil.js   # Edición de perfil completa
│   └── usePerfilValidationComponents.js # Componentes de validación
├── dashboard/               # Hooks del dashboard
│   ├── index.js
│   ├── useSensorData.js     # Datos de sensores IoT
│   └── useLdrStatus.js      # Estado de sensores LDR
├── login/                   # Hooks de autenticación
│   ├── useAuth.js           # Autenticación general
│   ├── useFocusField.js     # Manejo de focus en campos
│   ├── useLoginForm.js      # Formulario de login
│   └── usePasswordRecovery.js # Recuperación de contraseña
├── muestras/                # Hooks de gestión de muestras
│   ├── index.js
│   ├── useMuestras.js       # CRUD de muestras
│   ├── useMuestrasFilter.js # Filtrado y búsqueda
│   ├── useMuestrasActions.js # Acciones de usuario
│   ├── useMuestrasResultados.js # Gestión de resultados
│   ├── useQuimicaSanguinea.js # Resultados química sanguínea
│   ├── useBiometriaHematica.js # Resultados biometría hemática
│   ├── useResultadosView.js # Vista de resultados
│   ├── useComboBoxSample.js # Selector de muestras
│   └── useModalMuestra.js   # Modal de muestras
└── pedidos/                 # Hooks de gestión de pedidos
    ├── index.js
    ├── usePedidos.js        # CRUD de pedidos
    ├── usePedidosFilter.js  # Filtrado y búsqueda
    ├── usePedidosActions.js # Acciones de usuario
    ├── useNuevaMuestra.js   # Registro de nuevas muestras
    ├── useTablaPedidos.js   # Tabla de pedidos
    └── useModalPedido.js    # Modal de pedidos
```

## Hooks de Autenticación y Perfil

### useEditarPerfil
- **Propósito**: Gestión completa del formulario de edición de perfil
- **Estado**: formData, validationErrors, loading, validationStatus, isValidating
- **Funciones**: 
  - handleInputChange(field, value) - Cambios en inputs con validación en tiempo real
  - handleSave() - Guardar cambios en el servidor
  - handleCancel() - Cancelar y limpiar formulario
  - validatePassword(password) - Validación de contraseña
- **Características**: Validación en tiempo real, debounce de 2s, validación de email única

### usePerfilValidationComponents
- **Propósito**: Componentes reutilizables para validación visual
- **Componentes**: 
  - ValidationIndicator - Indicador de estado de validación
  - PasswordValidationList - Lista de requisitos de contraseña
- **Características**: Estilos incluidos, PropTypes definidos

## Hooks del Dashboard

### useSensorData
- **Propósito**: Obtener datos de sensores IoT (LDR y temperatura)
- **Estado**: ldrData, tempData, loading, error
- **Funciones**: fetchSensorData, refetch
- **Actualización**: Cada 30 segundos automáticamente

### useLdrStatus
- **Propósito**: Determinar el estado del sensor LDR
- **Funciones**: getLdrStatus(ldr) - retorna estado, estilo y descripción

## Hooks de Pedidos

### usePedidos
- **Propósito**: Gestión de datos y operaciones CRUD de pedidos
- **Estado**: pedidos, loading, refreshing, error
- **Funciones**: 
  - fetchPedidos() - Obtener pedidos del servidor
  - deletePedido(id) - Eliminar pedido
  - updatePedidoEstado(id, estado) - Actualizar estado
  - onRefresh() - Refrescar datos

### usePedidosFilter
- **Propósito**: Manejo de filtros y búsqueda de pedidos
- **Estado**: searchText, filter, customFilters
- **Funciones**:
  - getFilteredData - Datos filtrados (memoizado)
  - clearFilters() - Limpiar filtros
  - getStatusCounts() - Conteo por estado
  - getFilterStatusText() - Texto descriptivo del filtro

### usePedidosActions
- **Propósito**: Manejo de acciones de usuario en pedidos
- **Estado**: selectedOrder
- **Funciones**:
  - handleView(item) - Ver detalles del pedido
  - handleDelete(item) - Eliminar con confirmación
  - handleCompletarPedido(order) - Marcar como completado
  - handleCancelarPedido(order) - Cancelar pedido
  - handleCloseModal() - Cerrar modal
  - handleNuevaMuestra(data) - Registrar nueva muestra

### useNuevaMuestra
- **Propósito**: Manejo del registro de nuevas muestras de laboratorio
- **Estado**: selectedTipo, pedido, pacienteId, nombre, observaciones, loading
- **Funciones**:
  - enviarMuestra(onSubmit, onClose) - Enviar muestra al servidor
  - limpiarCampos() - Limpiar formulario
  - llenarCamposAutomaticamente(orderData) - Llenar campos desde pedido
  - validarFormulario() - Validar datos antes del envío
  - determinarTipoMuestra(analisis) - Determinar tipo basado en análisis
  - mapearTipoMuestra(tipo) - Mapear al formato del backend

## Hooks de Login

### useAuth
- **Propósito**: Autenticación y manejo de sesión
- **Funciones**: login, logout, verificación de token

### useLoginForm
- **Propósito**: Manejo del formulario de login
- **Estado**: campos del formulario, validación, loading

### usePasswordRecovery
- **Propósito**: Proceso de recuperación de contraseña
- **Estado**: formulario de recuperación, pasos del proceso

### useFocusField
- **Propósito**: Manejo automático del focus en campos de formulario
- **Funciones**: gestión de focus, validación visual

## Principios de Diseño

1. **Separación de Responsabilidades**: Cada hook tiene una responsabilidad específica
2. **Reutilización**: Los hooks pueden ser utilizados en múltiples componentes
3. **Composición**: Los hooks se pueden combinar para funcionalidades complejas
4. **Estado Centralizado**: Estado relacionado agrupado en el hook correspondiente
5. **Error Handling**: Manejo consistente de errores en todos los hooks
6. **Logging**: Logging detallado para debugging y monitoreo

## Uso

```javascript
// Importación desde el índice principal
import { usePedidos, usePedidosFilter, usePedidosActions, useNuevaMuestra } from '../hooks';

// Uso en componente de pedidos
const PedidosComponent = () => {
  const { pedidos, loading, error } = usePedidos();
  const { filteredData, searchText, setSearchText } = usePedidosFilter(pedidos);
  const { handleView, handleDelete } = usePedidosActions();
  
  // Componente lógico...
};

// Uso en componente de nueva muestra
const NuevaMuestraComponent = ({ isVisible, orderData, onSubmit, onClose }) => {
  const {
    selectedTipo,
    observaciones,
    loading,
    setSelectedTipo,
    setObservaciones,
    enviarMuestra
  } = useNuevaMuestra(isVisible, orderData);
  
  const handleSubmit = () => enviarMuestra(onSubmit, onClose);
  
  // Componente lógico...
};
```