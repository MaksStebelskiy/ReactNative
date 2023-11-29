import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  
  block: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#DCDCDC",
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  
  buttonContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  pickerSelectAdd: {
    inputAndroid: {
      width: 170,
    },
  },
  buttonDelete: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  textInputDelete: {
    width: 170,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  pickerSelect: {
    inputAndroid: {
      width: 170,
    },
  },
});