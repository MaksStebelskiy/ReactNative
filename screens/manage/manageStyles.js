import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  pickerSelectAdd: {
    inputAndroid: {
      width: 230,
      marginTop: 5,
    },
  },
  buttonDelete: {
    marginTop: 30,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textInputDelete: {
    width: 170,
    marginTop: 10,
    marginLeft: 13,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  pickerSelect: {
    inputAndroid: {
      width: 250,
      marginTop: 10,
    },
  },
});