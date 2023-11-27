import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import dbPromise from "./manageDB";
import { buttonStyles } from "../screens/manage/manageStyles";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { monthNames, ukrainianServiceNames } from "../screens/view/viewValues";

// функція оновлення (після виклику)
const updateRecordInDB = async (year, month, service, amount) => {
  try {
    const db = await dbPromise();
    await db.transaction((tx) => {
      console.log("amount в handleEdit", amount);
      tx.executeSql(
        "UPDATE costs SET amount = ? WHERE year = ? AND month = ? AND service = ?;",
        [amount, year, month, service],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log("Row updated successfully. New amount:", amount);
          } else {
            console.log("No rows updated.");
          }
        },
        (_, error) => {
          console.error("Error updating row:", error);
        }
      );
    });
  } catch (error) {
    console.error("Error updating row:", error);
  }
};

const EditMode = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedService,
  setSelectedService,
}) => {
  const [month, setMonth] = useState([]);
  const [services, setServices] = useState([]);
  const [amount, setAmount] = useState("");

  const fetchMonths = async (year) => {
    try {
      const db = await dbPromise();
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT DISTINCT month FROM costs WHERE year = ?;",
          [year],
          (_, result) => {
            const data = [];
            for (let i = 0; i < result.rows.length; i++) {
              data.push({
                label: monthNames.find(
                  (month) => month.value === result.rows.item(i).month
                )?.label,
                value: result.rows.item(i).month,
              });
            }
            setMonth(data);
          },
          (_, error) => {
            console.error("Помилка при виборі місяців з таблиці:", error);
          }
        );
      });
    } catch (error) {
      console.error("Помилка при виборі місяців:", error);
    }
  };

  const fetchServices = async (year, selectedMonth) => {
    try {
      const db = await dbPromise();
      await db.transaction((tx) => {
        tx.executeSql(
          "SELECT DISTINCT service FROM costs WHERE year = ? AND month = ?;",
          [year, selectedMonth],
          (_, result) => {
            const data = [];
            for (let i = 0; i < result.rows.length; i++) {
              data.push({
                label: ukrainianServiceNames[result.rows.item(i).service]?.name,
                value: result.rows.item(i).service,
              });
            }
            setServices(data);
          },
          (_, error) => {
            console.error("Помилка при виборі послуг з таблиці:", error);
          }
        );
      });
    } catch (error) {
      console.error("Помилка при виборі послуг:", error);
    }
  };

  const handleEditWithLogging = async () => {
    if (
      !selectedYear ||
      selectedMonth === null ||
      !selectedService ||
      !amount
    ) {
      showMessage({
        message: "Будь ласка, виберіть рік, місяць та послугу.",
        type: "warning",
      });
      return;
    }
  
    const selectedMonthLabel = monthNames.find(
      (m) => m.value === selectedMonth
    )?.label;
    const serviceName = ukrainianServiceNames[selectedService]?.name;
  
    if (amount) {
      console.log("amount в handleEditWithLogging", amount);
      await updateRecordInDB(
        selectedYear,
        selectedMonth,
        selectedService,
        amount,
      );
      showMessage({
        message: "Успіх",
        description: `Оновлено значення суми:\nПослуга - ${serviceName}\nМісяць - ${selectedMonthLabel}\nРік - ${selectedYear}\nНова сума - ${amount}`,
        type: "success",
      });
  
      fetchServices(selectedYear, selectedMonth, selectedService);
    } else {
      showMessage({
        message: "Будь ласка, введіть суму.",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear) {
        await fetchMonths(selectedYear);
      }
    };

    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    if (selectedMonth) {
      fetchServices(selectedYear, selectedMonth);
    }
  }, [selectedMonth]);

  return (
    <View>
      <TextInput
        placeholder="Введіть рік"
        keyboardType="numeric"
        value={selectedYear}
        onChangeText={(text) => setSelectedYear(text)}
        style={buttonStyles.textInputDelete}
      />

      <RNPickerSelect
        placeholder={{ label: "Виберіть місяць", value: null }}
        items={month}
        onValueChange={(value) => setSelectedMonth(value)}
        style={buttonStyles.pickerSelect}
        value={selectedMonth}
      />

      <RNPickerSelect
        placeholder={{ label: "Виберіть послугу", value: null }}
        items={services}
        onValueChange={(value) => setSelectedService(value)}
        style={buttonStyles.pickerSelect}
        value={selectedService}
      />

      <TextInput
        placeholder="Введіть суму"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        style={buttonStyles.textInputDelete}
      />

      <TouchableOpacity
        onPress={handleEditWithLogging}
        style={buttonStyles.buttonDelete}
      >
        <Text style={buttonStyles.buttonText}>Оновити</Text>
      </TouchableOpacity>

      <FlashMessage position="center" />
    </View>
  );
};

export { EditMode };
