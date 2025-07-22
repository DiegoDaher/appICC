import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useFilterBar } from '../../hooks';
import { filterStyles } from '../../themes';

const FilterBar = ({ activeFilter, setFilter, filters }) => {
  const { handleFilterPress, isFilterActive } = useFilterBar(activeFilter, setFilter);

  return (
    <View style={filterStyles.container}>
      {filters.map((filter, index) => {
        const isActive = isFilterActive(filter);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleFilterPress(filter)}
            style={[filterStyles.button, isActive ? filterStyles.active : filterStyles.inactive]}
          >
            <Text style={isActive ? filterStyles.textActive : filterStyles.textInactive}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

FilterBar.propTypes = {
  activeFilter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterBar;
