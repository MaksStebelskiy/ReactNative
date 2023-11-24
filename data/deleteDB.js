import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { buttonStyles } from "../screens/manage/manageStyles";
import { monthNames, ukrainianServiceNames } from "../screens/view/viewValues";
import dbPromise from "./manageDB";
import FlashMessage, { showMessage } from "react-native-flash-message";



const handleDelete = async (year, month, service) => {
  try {
    const db = await dbPromise();

    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM costs WHERE year = ? AND month = ? AND service = ?;",
        [year, month, service],
        (_, result) => {
          console.log("Row deleted successfully.");
        },
        (_, error) => {
          console.error("Error deleting row:", error);
        }
      );
    });
  } catch (error) {
    console.error("Error deleting row:", error);
  }
};

const DeleteMode = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedService,
  setSelectedService,
  handleDelete,
}) => {
  const [month, setMonth] = useState([]);
  const [services, setServices] = useState([]);

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
      db.transaction((tx) => {
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

  const handleDeleteWithLogging = async () => {
    if (!selectedYear || selectedMonth === null || !selectedService || !month) {
      showMessage({
        message: 'Будь ласка, виберіть рік, місяць та послугу.',
        type: 'warning',
      });

      return;
    }
    const selectedMonthLabel = monthNames.find(
      (m) => m.value === selectedMonth
    )?.label;
    const serviceName = ukrainianServiceNames[selectedService]?.name;

    await handleDelete(selectedYear, selectedMonth, selectedService);
    setSelectedService(null);
    
    showMessage({
      message: "Успіх",
      description: `Видалено:\nПослуга - ${serviceName}\nМісяць - ${selectedMonthLabel}\nРік - ${selectedYear}`,
      type: "success",
    });
    
    fetchServices(selectedYear, selectedMonth);
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

      <TouchableOpacity
        onPress={handleDeleteWithLogging}
        style={buttonStyles.buttonDelete}
      >
        <Text style={buttonStyles.buttonText}>Видалити</Text>
      </TouchableOpacity>
      <FlashMessage position="center" />
    </View>
  );
};

export { handleDelete, DeleteMode };
