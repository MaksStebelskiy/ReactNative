import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { buttonStyles } from './manageStyles';
import dbPromise from '../../data/manageDB';
import DeleteMode from '../../data/deleteDB';
import deleteDB from '../../data/deleteDB';


const ManageScreen = ({ }) => {
  const [mode, setMode] = useState("add");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [amount, setAmount] = useState("");

  const [hasNonNumeric, setHasNonNumeric] = useState(false);
  const styles = StyleSheet.create({
    input: {
      width: 200,
      marginTop: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
    },
  });
  const handleAmountChange = (text) => {
    const amountRegex = /^[0-9]+(\.[0-9]+)?$/;
    const hasNonNumericChars = !amountRegex.test(text);
    setHasNonNumeric(hasNonNumericChars);
    setAmount(text);
  };






  //додавання
  const handleAdd = () => {
    if (!selectedYear || !selectedMonth || !selectedService || !amount) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    const amountRegex = /^[0-9]+(\.[0-9]+)?$/;
    if (!amountRegex.test(amount)) {
      alert('Некоректне значення суми. Будь ласка, введіть числове значення');
      return;
    }
    console.log("Додано: ", selectedYear, selectedMonth, selectedService, amount);


    const values = [selectedYear, selectedMonth, selectedService, parseFloat(amount)];

    dbPromise()
      .then((db) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              `INSERT INTO costs (year, month, service, amount) VALUES (?, ?, ?, ?);`,
              values,
              (_, result) => {
                console.log('Запис успішно додано до таблиці');
              },
              (_, error) => {
                console.error('Помилка при додаванні запису до таблиці:', error);
              }
            );

            // Виведення вмісту БД в консоль
            tx.executeSql(
              `SELECT * FROM costs;`,
              [],
              (_, resultSet) => {
                const rows = resultSet.rows;
                console.log('Вміст таблиці costs:');
                for (let i = 0; i < rows.length; i++) {
                  console.log(rows.item(i));
                }
              },
              (_, error) => {
                console.error('Помилка при виборі даних з таблиці:', error);
              }
            );
          },
          (error) => {
            console.error('Помилка при транзакції:', error);
          }
        );
      })
      .catch((error) => {
        console.error('Помилка при доступі до бази даних:', error);
      });

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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 17, fontWeight: 'bold', }}>Режим роботи: </Text>
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


      {mode === "add" && ( //режим додавання
        <>
          <Text style={{ fontSize: 17, fontWeight: 'bold', }}>Вкажіть рік </Text>
          <RNPickerSelect
            placeholder={{ label: "Виберіть рік", value: null }}
            items={[
              { label: "2020", value: "2020" },
              { label: "2021", value: "2021" },
              { label: "2022", value: "2022" },
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
            ]}
            onValueChange={(value) => setSelectedYear(value)}
            style={{ inputAndroid: { width: 200, marginTop: 10 } }}
            value={selectedYear}
          />

          <Text style={{ fontSize: 17, fontWeight: 'bold', }}>Оберіть місяць: </Text>
          <RNPickerSelect
            placeholder={{ label: "Виберіть місяць", value: null }}
            items={[
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
            ]}
            onValueChange={(value) => setSelectedMonth(value)}
            style={{ inputAndroid: { width: 200, marginTop: 10 } }}
            value={selectedMonth}
          />

          <Text style={{ fontSize: 17, fontWeight: 'bold', }}>Оберіть послугу: </Text>
          <RNPickerSelect
            placeholder={{ label: "Виберіть послугу", value: null }}
            items={[
              { label: "Вода", value: "water" },
              { label: "Газ", value: "gas" },
            ]}
            onValueChange={(value) => setSelectedService(value)}
            style={{ inputAndroid: { width: 200, marginTop: 10 } }}
            value={selectedService}
          />

          <Text style={{ fontSize: 17, fontWeight: 'bold', }}>Вкажіть суму: </Text>
          <TextInput
            placeholder="Введіть суму"
            keyboardType="numeric"
            value={amount}
            onChangeText={handleAmountChange}
            style={[
              styles.input,
              hasNonNumeric ? { borderColor: 'red' } : { borderColor: 'gray' },
            ]}
          />

          <TouchableOpacity onPress={handleAdd} style={[buttonStyles.buttonContainer, { marginTop: 18, backgroundColor: "green" }]}>
            <Text style={buttonStyles.buttonText}>Додати</Text>
          </TouchableOpacity>
        </>
      )}

      {mode === 'delete' && (
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
          { marginTop: 18, backgroundColor: "white", borderWidth: 1, borderColor: "green" }
        ]}
      >
        <Text style={[buttonStyles.buttonText, { color: "green" }]}>Скасувати</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageScreen;
