// Home.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { homeStyles } from "./styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={homeStyles.container}>

      <Text style={homeStyles.greetingText}>
        Ласкаво просимо до портфоліо витрат!
      </Text>
      


      <TouchableOpacity
        style={[homeStyles.button, { backgroundColor: "purple" }]} 
        onPress={() => navigation.navigate("ViewScreen")}
      >
        <Text style={[{ color: "white" }, homeStyles.buttonText]}>Перегляд витрат</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[homeStyles.button, { backgroundColor: "purple" }]} 
        onPress={() => navigation.navigate("ManageScreen")}
      >
        <Text style={[{ color: "white" }, homeStyles.buttonText]}>Керування витратами</Text>
      </TouchableOpacity>




    </View>
  );
};

export default HomeScreen;
