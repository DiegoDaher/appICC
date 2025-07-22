import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusField } from '../../hooks';
import { styles } from '../../themes';

const SearchBar = ({ searchText, onChangeSearch, placeholder }) => {
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

  return (
    <View style={styles.boxSearch}>
      <TextInput
        style={getFieldStyle('search', styles.inputSearch, styles.inputFocus)}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={onChangeSearch}
        onFocus={() => setFocus('search')}
        onBlur={clearFocus}
      />
      <Ionicons name="search" size={20} color="#D32F2F" style={styles.icon} />
    </View>
  );
};

// PropTypes para validación de props
SearchBar.propTypes = {
  searchText: PropTypes.string,
  onChangeSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
