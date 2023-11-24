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
  buttonDelete: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textInputDelete: {
    width: 185,
    marginTop: 10,
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