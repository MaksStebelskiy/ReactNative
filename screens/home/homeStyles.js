import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  greetingText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "green", 
    borderRadius: 10, 
    padding: 10, 
  },
  buttonText: {
    fontSize: 20,
    color: "white", 
  },
});

export default homeStyles;
