import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  greetingText: {
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
    backgroundColor: "green", // Змінено колір кнопок на зелений
    borderRadius: 10, // Змінено радіус кутів
    padding: 10, // Додано внутрішній відступ для кнопок
  },
  buttonText: {
    fontSize: 20,
    color: "white", // Змінено колір тексту на білий
  },
});

export default homeStyles;
