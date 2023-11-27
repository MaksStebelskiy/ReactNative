// addDB.js
import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { buttonStyles } from "../screens/manage/manageStyles";
import { monthNames, ukrainianServiceNames } from "../screens/view/viewValues";
import dbPromise from "./manageDB";

export const handleAmountChange = (text, setHasNonNumeric, setAmount) => {
  const amountRegex = /^[0-9]+(\.[0-9]+)?$/;
  const hasNonNumericChars = !amountRegex.test(text);
  setHasNonNumeric(hasNonNumericChars);
  setAmount(text);
};

export const handleAdd = (year, month, service, amount, setAmount) => {
  if (!year || !month || !service || !amount) {
    alert("Будь ласка, заповніть всі поля");
    return;
  }

  const amountRegex = /^[0-9]+(\.[0-9]+)?$/;
  if (!amountRegex.test(amount)) {
    alert("Некоректне значення суми. Будь ласка, введіть числове значення");
    return;
  }

  const values = [year, month, service, parseFloat(amount)];

  dbPromise()
    .then((db) => {
      db.transaction(
        (tx) => {
          // Перевірка наявності запису перед додаванням
          tx.executeSql(
            `SELECT * FROM costs WHERE year = ? AND month = ? AND service = ?;`,
            [year, month, service],
            (_, resultSet) => {
              if (resultSet.rows.length > 0) {
                // Запис вже існує

                showMessage({
                  message: "Запис з такими даними вже існує",
                  type: "warning",
                });
              } else {
                // Додавання запису
                tx.executeSql(
                  `INSERT INTO costs (year, month, service, amount) VALUES (?, ?, ?, ?);`,
                  values,
                  (_, result) => {
                    console.log("Запис успішно додано до таблиці");
                    console.log("Додано: ", year, month, service, amount);

                    const selectedMonthLabel = monthNames.find(
                      (m) => m.value === month
                    )?.label;

                    const selectedServiceName =
                      ukrainianServiceNames[service]?.name;
                    showMessage({
                      message: "Успіх",
                      description: `Додано:\nПослуга - ${selectedServiceName}\nСума - ${amount}\nМісяць - ${selectedMonthLabel}\nРік - ${year}`,
                      type: "success",
                      duration: 5000,
                      hideOnPress: true,
                    });

                    setAmount("");
                  },
                  (_, error) => {
                    console.error(
                      "Помилка при додаванні запису до таблиці:",
                      error
                    );
                  }
                );
              }
            },
            (_, error) => {
              console.error("Помилка при виконанні запиту SELECT:", error);
            }
          );
        },
        (error) => {
          console.error("Помилка при транзакції:", error);
        }
      );
    })
    .catch((error) => {
      console.error("Помилка при доступі до бази даних:", error);
    });
};

export const AddMode = (
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
  handleAdd
) => {
  const styles = StyleSheet.create({
    input: {
      width: 200,
      marginTop: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
    },
  });

  return (
    <>
      <View style={buttonStyles.block}>
      <Text style={buttonStyles.label}>Оберіть рік </Text>
        <RNPickerSelect
          placeholder={{ label: "Рік", value: null }}
          items={[
            { label: "2023", value: "2023" },
            { label: "2024", value: "2024" },
          ]}
          onValueChange={(value) => setSelectedYear(value)}
          style={buttonStyles.pickerSelectAdd}
          value={selectedYear}
        />
      </View>
      <View style={buttonStyles.block}>
        <Text style={buttonStyles.label}>
          Оберіть місяць:{" "}
        </Text>
        <RNPickerSelect
          placeholder={{ label: "Місяць", value: null }}
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
          style={buttonStyles.pickerSelectAdd}
          value={selectedMonth}
        />
      </View>
      <View style={buttonStyles.block}>
      <Text style={buttonStyles.label}>
          Оберіть послугу:{" "}
        </Text>
        <RNPickerSelect
          placeholder={{ label: "Послуга", value: null }}
          items={[
            { label: "Водопостачання", value: "water" },
            { label: "Водовідведення", value: "sewerage" },
            { label: "Гаряча вода", value: "hot_water" },
            { label: "Опалення", value: "heating" },
            { label: "Газопостачання", value: "gas" },
            { label: "Газорозподіл", value: "gas_distribution" },
            { label: "Електроенергія", value: "electricity" },
            { label: "Сміття", value: "garbage" },
            { label: "ОСББ", value: "condominium" },
            { label: "Інтернет", value: "internet" },
            { label: "Телебачення", value: "television" },
          ]}
          onValueChange={(value) => setSelectedService(value)}
          style={buttonStyles.pickerSelectAdd}
          value={selectedService}
        />
      </View>
      <View style={buttonStyles.block}>
      <Text style={buttonStyles.label}>Вкажіть суму: </Text>
        <TextInput
          placeholder="Сума"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) =>
            handleAmountChange(text, setHasNonNumeric, setAmount)
          }
          style={[
            styles.input,
            hasNonNumeric ? { borderColor: "red" } : { borderColor: "gray" },
          ]}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          handleAdd(
            selectedYear,
            selectedMonth,
            selectedService,
            amount,
            setAmount
          )
        }
        style={[
          buttonStyles.buttonContainer,
          { backgroundColor: "green" },
        ]}
      >
        <Text style={buttonStyles.buttonText}>Додати</Text>
      </TouchableOpacity>
      <FlashMessage position="center" />
    </>
  );
};
