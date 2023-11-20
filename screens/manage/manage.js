import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const ManageScreen = ({}) => {
  const [mode, setMode] = useState("add"); 
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [amount, setAmount] = useState("");

  const years = [
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
  ];

  const months = [
    { label: "Січень", value: "01" },
    { label: "Лютий", value: "02" },
    { label: "Березень", value: "03" },
    { label: "Квітень", value: "04" },
    { label: "Травень", value: "05" },
    { label: "Червень", value: "06" },
    { label: "Липень", value: "07" },
    { label: "Серпень", value: "08" },
    { label: "Вересень", value: "09" },
    { label: "Жовтень", value: "10" },
    { label: "Листопад", value: "11" },
    { label: "Грудень", value: "12" },
  ];

  const services = [
    { label: "Вода", value: "water" },
    { label: "Газ", value: "gas" },
  ];

  const handleAdd = () => {
    // Обробник для додавання даних в базу або збереження їх
    // Ви можете використовувати стан (selectedYear, selectedMonth, тощо.) для відправлення даних у базу або обробки їх
    if(!selectedYear || !selectedMonth || !selectedService || !amount) {
        alert('Будь ласка, заповніть всі поля');
        return;
    }

    const amountRegex = /^[0-9]+(\.[0-9]+)?$/;
    if (!amountRegex.test(amount)){
        alert('Некоректне значення суми. Будь ласка, введіть числове значення');
        return;
    }

    console.log("Додано: ", selectedYear, selectedMonth, selectedService, amount);
  };

  const handleCancel = () => {
    // Обробник для скасування
    // Очищення полів вводу або повернення на попередню сторінку
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedService(null);
    setAmount("");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Сторінка керування</Text>

      {/* Перемикач для режиму (додавання/редагування/видалення) */}
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

      {/* Поля для введення даних в залежності від режиму */}
      {mode === "add" && (
        <>
          <RNPickerSelect
            placeholder={{ label: "Виберіть рік", value: null }}
            items={years}
            onValueChange={(value) => setSelectedYear(value)}
            style={{ inputAndroid: { width: 200, marginTop: 10 } }}
            value={selectedYear}
          />

          <RNPickerSelect
            placeholder={{ label: "Виберіть місяць", value: null }}
            items={months}
            onValueChange={(value) => setSelectedMonth(value)}
            style={{ inputAndroid: { width: 200, marginTop: 10 } }}
            value={selectedMonth}
          />

          <RNPickerSelect
            placeholder={{ label: "Виберіть послугу", value: null }}
            items={services}
            onValueChange={(value) => setSelectedService(value)}
            style={{ inputAndroid: { width: 200, marginTop: 10 } }}
            value={selectedService}
          />

          <TextInput
            placeholder="Введіть суму"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            style={{ width: 200, marginTop: 10, padding: 10, borderWidth: 1, borderColor: "gray" }}
          />

          <TouchableOpacity onPress={handleAdd} style={{ marginTop: 10, backgroundColor: "green", padding: 10 }}>
            <Text style={{ color: "white" }}>Додати</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Кнопка скасувати для всіх режимів */}
      <TouchableOpacity onPress={handleCancel} style={{ marginTop: 10, backgroundColor: "red", padding: 10 }}>
        <Text style={{ color: "white" }}>Скасувати</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageScreen;
