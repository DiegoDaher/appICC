import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useResultadosView } from '../../hooks';
import { resultStyles } from '../../themes';

const ResultadosView = ({ sample }) => {
  const {
    shouldShowResults,
    sampleType,
    quimicaData,
    biometriaData
  } = useResultadosView(sample);

  if (!shouldShowResults) {
    return null;
  }

  const renderQuimicaSanguinea = (data) => {
    if (!data) return null;

    return (
      <View style={resultStyles.resultsContainer}>
        <Text style={resultStyles.resultsTitle}> Resultados - Química Sanguínea</Text>
        <View style={resultStyles.resultsGrid}>
          {data.resultados.map((resultado) => (
            <View key={resultado.key} style={resultStyles.resultItem}>
              <Text style={resultStyles.resultLabel}>{resultado.label}:</Text>
              <Text style={resultStyles.resultValue}>{resultado.value} {resultado.unit}</Text>
            </View>
          ))}
        </View>
        {data.observaciones && (
          <View style={resultStyles.observacionesContainer}>
            <Text style={resultStyles.observacionesTitle}>Observaciones:</Text>
            <Text style={resultStyles.observacionesText}>{data.observaciones}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderBiometriaHematica = (data) => {
    if (!data) return null;

    return (
      <View style={resultStyles.resultsContainer}>
        <Text style={resultStyles.resultsTitle}>Resultados - Biometría Hemática</Text>
        
        {data.formulaRoja.length > 0 && (
          <View style={resultStyles.formulaSection}>
            <Text style={resultStyles.formulaTitle}>Fórmula Roja</Text>
            <View style={resultStyles.resultsGrid}>
              {data.formulaRoja.map((resultado) => (
                <View key={resultado.key} style={resultStyles.resultItem}>
                  <Text style={resultStyles.resultLabel}>{resultado.label}:</Text>
                  <Text style={resultStyles.resultValue}>{resultado.value} {resultado.unit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.formulaBlanca.length > 0 && (
          <View style={resultStyles.formulaSection}>
            <Text style={resultStyles.formulaTitle}>Fórmula Blanca</Text>
            <View style={resultStyles.resultsGrid}>
              {data.formulaBlanca.map((resultado) => (
                <View key={resultado.key} style={resultStyles.resultItem}>
                  <Text style={resultStyles.resultLabel}>{resultado.label}:</Text>
                  <Text style={resultStyles.resultValue}>{resultado.value} {resultado.unit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.observaciones && (
          <View style={resultStyles.observacionesContainer}>
            <Text style={resultStyles.observacionesTitle}>Observaciones:</Text>
            <Text style={resultStyles.observacionesText}>{data.observaciones}</Text>
          </View>
        )}
      </View>
    );
  };

  // Renderizar según el tipo de muestra
  if (sampleType === 'quimica') {
    return renderQuimicaSanguinea(quimicaData);
  } else if (sampleType === 'biometria') {
    return renderBiometriaHematica(biometriaData);
  }

  return null;
};



ResultadosView.propTypes = {
  sample: PropTypes.shape({
    status: PropTypes.bool,
    tipoMuestra: PropTypes.string,
    quimicaSanguinea: PropTypes.object,
    biometriaHematica: PropTypes.object,
  }),
};

export default ResultadosView;
