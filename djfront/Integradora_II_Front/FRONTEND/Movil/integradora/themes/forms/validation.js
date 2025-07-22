import { StyleSheet } from "react-native";

export const validation = StyleSheet.create({
  validationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  validationIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  validationMessage: {
    fontSize: 12,
    flex: 1,
    fontWeight: '500',
  },
  passwordValidationList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginTop: -10,
    marginBottom: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  passwordValidationTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  passwordCheckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  passwordCheckIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    width: 16,
  },
  passwordCheckText: {
    fontSize: 12,
    flex: 1,
  },
});

