import { StyleSheet } from 'react-native';

export const comboBoxStyles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 16,
    marginBottom: 10 
    },
  comboBox: { 
    flexDirection: 'row',
    justifyContent: 'space-around'
    },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 2,
  },
  selected: {
    backgroundColor: '#BF1E2D'
  },
  unselected: {
    backgroundColor: '#E0E0E0'
  },
  textSelected: {
    color: 'white'
  },
  textUnselected: {
    color: '#333'
  },
  optionText: {
    marginLeft: 8
  },
  icon: {
    width: 20,
    height: 20
  }
});