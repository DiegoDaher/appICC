import { StyleSheet } from 'react-native';

export const tableStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeIcon: {
      width: 30,
      height: 30,
    },
    dataContainer: {
        flex: 1,
        paddingRight: 10,
    },
    dateText: {
      fontSize: 12,
      color: '#7F8C8D',
      marginBottom: 2,
    },
  infoRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 2,
  },  
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    width: 90,
    marginRight: 10,
  },
  statusBadgeP: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    width: 70,
    marginRight: 10,
  },
  patientText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 2,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 10,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusTextPM: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
  },
  statusTextP: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusTextM: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
},

  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 2,
  },

})