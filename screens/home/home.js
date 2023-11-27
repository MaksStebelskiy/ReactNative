// Home.js
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { homeStyles } from "./homeStyles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={homeStyles.container}>

<Image
        source={require('../../assets/utility.png')} 
        style={homeStyles.image}
      />

      <Text style={homeStyles.greetingText}>
        Ласкаво просимо до менеджера витрат
      </Text>
      
      <TouchableOpacity
        style={[homeStyles.button]} 
        onPress={() => navigation.navigate("ViewScreen")}
      >
        <Text style={[{ color: "white" }, homeStyles.buttonText]}>Перегляд витрат</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[homeStyles.button]} 
        onPress={() => navigation.navigate("ManageScreen")}
      >
        <Text style={[{ color: "white" }, homeStyles.buttonText]}>Керування витратами</Text>
      </TouchableOpacity>


    </View>
  );
};

export default HomeScreen;
