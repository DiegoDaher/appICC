import { useMemo } from 'react';

export const useResultadosView = (sample) => {
  // Determinar si la muestra tiene resultados válidos
  const hasResults = useMemo(() => {
    if (!sample || sample.status === false) {
      console.log('📊 No hay resultados - muestra sin completar o inexistente');
      return false;
    }
    console.log('📊 Verificando resultados para muestra:', sample._id?.slice(-8));
    return true;
  }, [sample]);

  // Determinar el tipo de muestra y qué resultados mostrar
  const sampleType = useMemo(() => {
    if (!sample?.tipoMuestra) {
      console.log('❓ Tipo de muestra no definido');
      return null;
    }

    const tipoMuestra = sample.tipoMuestra.toLowerCase().replace(/\s+/g, '');
    console.log('🔍 Analizando tipo de muestra:', tipoMuestra);

    if (tipoMuestra.includes('quimicasanguinea') || tipoMuestra.includes('quimica')) {
      console.log('🧪 Tipo identificado: Química Sanguínea');
      return 'quimica';
    } else if (tipoMuestra.includes('biometriahematica') || tipoMuestra.includes('biometria')) {
      console.log('🩸 Tipo identificado: Biometría Hemática');
      return 'biometria';
    }

    console.log(' Tipo de muestra no reconocido:', tipoMuestra);
    return null;
  }, [sample?.tipoMuestra]);

  // Verificar si hay datos de química sanguínea
  const hasQuimicaData = useMemo(() => {
    const hasData = sample?.quimicaSanguinea && Object.keys(sample.quimicaSanguinea).length > 0;
    if (sampleType === 'quimica') {
      console.log(`🧪 Datos de química sanguínea ${hasData ? 'encontrados' : 'no encontrados'}`);
    }
    return hasData;
  }, [sample?.quimicaSanguinea, sampleType]);

  // Verificar si hay datos de biometría hemática
  const hasBiometriaData = useMemo(() => {
    const hasData = sample?.biometriaHematica && 
                   (sample.biometriaHematica.formulaRoja || sample.biometriaHematica.formulaBlanca);
    if (sampleType === 'biometria') {
      console.log(`🩸 Datos de biometría hemática ${hasData ? 'encontrados' : 'no encontrados'}`);
    }
    return hasData;
  }, [sample?.biometriaHematica, sampleType]);

  // Preparar datos de química sanguínea para mostrar
  const quimicaData = useMemo(() => {
    if (sampleType !== 'quimica' || !hasQuimicaData) return null;

    const data = sample.quimicaSanguinea;
    const resultados = [];

    // Crear array de resultados válidos
    const campos = [
      { key: 'glucosa', label: 'Glucosa', unit: 'mg/dL' },
      { key: 'glucosaPost', label: 'Glucosa Post', unit: 'mg/dL' },
      { key: 'acidoUrico', label: 'Ácido Úrico', unit: 'mg/dL' },
      { key: 'urea', label: 'Urea', unit: 'mg/dL' },
      { key: 'creatinina', label: 'Creatinina', unit: 'mg/dL' },
      { key: 'colesterol', label: 'Colesterol', unit: 'mg/dL' },
      { key: 'LDR', label: 'LDR', unit: 'mg/dL' },
      { key: 'gGT', label: 'GGT', unit: 'U/L' },
      { key: 'trigliceridos', label: 'Triglicéridos', unit: 'mg/dL' }
    ];

    campos.forEach(campo => {
      if (data[campo.key] !== undefined && data[campo.key] !== null) {
        resultados.push({
          key: campo.key,
          label: campo.label,
          value: data[campo.key],
          unit: campo.unit
        });
      }
    });

    console.log('🧪 Datos de química procesados:', resultados.length, 'campos');
    return { resultados, observaciones: data.observaciones };
  }, [sample?.quimicaSanguinea, sampleType, hasQuimicaData]);

  // Preparar datos de biometría hemática para mostrar
  const biometriaData = useMemo(() => {
    if (sampleType !== 'biometria' || !hasBiometriaData) return null;

    const data = sample.biometriaHematica;
    const formulaRoja = [];
    const formulaBlanca = [];

    // Procesar fórmula roja
    if (data.formulaRoja) {
      const camposRoja = [
        { key: 'hemoglobina', label: 'Hemoglobina', unit: 'g/dL' },
        { key: 'hematocrito', label: 'Hematocrito', unit: '%' },
        { key: 'eritrocitos', label: 'Eritrocitos', unit: 'M/μL' },
        { key: 'conMediaHb', label: 'Conc. Media Hb', unit: 'g/dL' },
        { key: 'volGlobularMedia', label: 'Vol. Globular Media', unit: 'fL' },
        { key: 'HBCorpuscularMedia', label: 'Hb Corpuscular Media', unit: 'pg' },
        { key: 'plaqutas', label: 'Plaquetas', unit: 'K/μL' } // Nota: API usa "plaqutas"
      ];

      camposRoja.forEach(campo => {
        if (data.formulaRoja[campo.key] !== undefined && data.formulaRoja[campo.key] !== null) {
          formulaRoja.push({
            key: campo.key,
            label: campo.label,
            value: data.formulaRoja[campo.key],
            unit: campo.unit
          });
        }
      });
    }

    // Procesar fórmula blanca
    if (data.formulaBlanca) {
      const camposBlanca = [
        { key: 'cuentaLeucocitaria', label: 'Cuenta Leucocitaria', unit: '/μL' },
        { key: 'linfocitos', label: 'Linfocitos', unit: '%' },
        { key: 'monocitos', label: 'Monocitos', unit: '%' },
        { key: 'segmentados', label: 'Segmentados', unit: '%' },
        { key: 'enBanda', label: 'En Banda', unit: '%' },
        { key: 'neutrofilosT', label: 'Neutrófilos T', unit: '%' },
        { key: 'eosinofilos', label: 'Eosinófilos', unit: '%' },
        { key: 'basofilos', label: 'Basófilos', unit: '%' }
      ];

      camposBlanca.forEach(campo => {
        if (data.formulaBlanca[campo.key] !== undefined && data.formulaBlanca[campo.key] !== null) {
          formulaBlanca.push({
            key: campo.key,
            label: campo.label,
            value: data.formulaBlanca[campo.key],
            unit: campo.unit
          });
        }
      });
    }

    console.log('🩸 Datos de biometría procesados:', {
      formulaRoja: formulaRoja.length,
      formulaBlanca: formulaBlanca.length
    });

    return {
      formulaRoja,
      formulaBlanca,
      observaciones: data.observaciones
    };
  }, [sample?.biometriaHematica, sampleType, hasBiometriaData]);

  // Determinar qué mostrar
  const shouldShowResults = hasResults && sampleType && 
    ((sampleType === 'quimica' && hasQuimicaData) || 
     (sampleType === 'biometria' && hasBiometriaData));

  console.log('📊 Estado final:', {
    hasResults,
    sampleType,
    shouldShowResults,
    hasQuimicaData,
    hasBiometriaData
  });

  return {
    hasResults,
    sampleType,
    shouldShowResults,
    quimicaData,
    biometriaData,
    hasQuimicaData,
    hasBiometriaData
  };
};
