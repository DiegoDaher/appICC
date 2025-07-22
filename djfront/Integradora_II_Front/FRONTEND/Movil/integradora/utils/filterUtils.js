export const filterData = (data, searchText) => {
  if (!searchText) return data; // Return original data if search is empty

  const lowerSearchText = searchText.toLowerCase();

  return data.filter(item => {
    // Check for new orders format (usuarioId, analisis, notas, estado)
    if (item.usuarioId) {
      const matchesUser = (
        String(item.usuarioId.nombre).toLowerCase().includes(lowerSearchText) ||
        String(item.usuarioId.apellidoPaterno).toLowerCase().includes(lowerSearchText) ||
        String(item.usuarioId.apellidoMaterno).toLowerCase().includes(lowerSearchText) ||
        String(item.usuarioId.correo).toLowerCase().includes(lowerSearchText)
      );

      const matchesAnalisis = item.analisis?.some(analisis =>
        String(analisis.nombre).toLowerCase().includes(lowerSearchText) ||
        String(analisis.descripcion).toLowerCase().includes(lowerSearchText)
      ) || false;

      const matchesTopLevel = (
        String(item.estado).toLowerCase().includes(lowerSearchText) ||
        String(item.notas).toLowerCase().includes(lowerSearchText) ||
        String(item._id).toLowerCase().includes(lowerSearchText)
      );

      return matchesUser || matchesAnalisis || matchesTopLevel;
    }
    
    // Check for old orders format (nameUsuario, status, descripcion, procedimientos)
    if (item.nameUsuario) {
      const matchesTopLevel = (
        String(item.nameUsuario).toLowerCase().includes(lowerSearchText) ||
        String(item.status).toLowerCase().includes(lowerSearchText) ||
        String(item.descripcion).toLowerCase().includes(lowerSearchText)
      );

      // Check procedimientos.titulo if exists
      const matchesProcedimientos = item.procedimientos?.some(proc =>
        String(proc.titulo).toLowerCase().includes(lowerSearchText)
      ) || false;

      return matchesTopLevel || matchesProcedimientos;
    }
    
    // Check for samples (nombrePaciente, tipoMuestra, observaciones)
    if (item.nombrePaciente) {
      return (
        String(item.nombrePaciente).toLowerCase().includes(lowerSearchText) ||
        String(item.tipoMuestra).toLowerCase().includes(lowerSearchText) ||
        String(item.observaciones).toLowerCase().includes(lowerSearchText)
      );
    }
    
    return false;
  });
};