// manage.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { buttonStyles } from "./manageStyles";
import deleteDB from "../../data/deleteDB";
import { handleAdd, AddMode } from "../../data/addDB"; // Зміни тут

const ManageScreen = ({}) => {
  const [mode, setMode] = useState("add");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [amount, setAmount] = useState("");
  const [hasNonNumeric, setHasNonNumeric] = useState(false);

  const handleAddPress = () => {
    handleAdd(selectedYear, selectedMonth, selectedService, amount);
  };

  const handleCancel = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedService(null);
    setAmount("");
  };

  const handleDelete = (year, month, service) => {
    deleteDB.handleDelete(year, month, service);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Режим роботи:{" "}
        </Text>
        <RNPickerSelect
          placeholder={{ label: "Виберіть режим", value: null }}
          items={[
            { label: "Додати", value: "add" },
            { label: "Редагувати", value: "edit" },
            { label: "Видалити", value: "delete" },
          ]}
          onValueChange={(value) => setMode(value)}
          style={{ inputAndroid: { width: 200, marginTop: 10 } }}
          value={mode}
        />

        {mode === "add" && AddMode(
          selectedYear,
          setSelectedYear,
          selectedMonth,
          setSelectedMonth,
          selectedService,
          setSelectedService,
          amount,
          setAmount,
          hasNonNumeric,
          setHasNonNumeric,
          handleAdd,
          handleAddPress 
        )}

        {mode === "delete" && (
          <deleteDB.DeleteMode
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            handleDelete={handleDelete}
          />
        )}

        <TouchableOpacity
          onPress={handleCancel}
          style={[
            buttonStyles.buttonContainer,
            {
              marginTop: 18,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "green",
            },
          ]}
        >
          <Text style={[buttonStyles.buttonText, { color: "green" }]}>
            Скасувати
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ManageScreen;
