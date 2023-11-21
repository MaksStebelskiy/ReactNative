import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import dbPromise from "../../data/manageDB";

const ViewScreen = ({}) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [costs, setCosts] = useState([]);
  const TABLE_NAME = "costs";
  const monthNames = [
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

  useEffect(() => {
    const fetchYears = async () => {
      const db = await dbPromise();
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT DISTINCT year FROM ${TABLE_NAME};`,
          [],
          (_, result) => {
            const data = result.rows._array;
            const yearsData = data.map((item) => ({
              label: `${item.year}`,
              value: `${item.year}`,
            }));
            setYears(yearsData);
          },
          (_, error) => {
            console.error("Error fetching years:", error);
          }
        );
      });
    };

    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const fetchMonths = async () => {
        const db = await dbPromise();
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT DISTINCT month FROM ${TABLE_NAME} WHERE year = ?;`,
            [selectedYear],
            (_, result) => {
              const data = result.rows._array;
              const monthsData = data.map((item) => ({
                label: monthNames.find((month) => month.value === item.month)
                  ?.label,
                value: item.month,
              }));
              setMonths(monthsData);
            },
            (_, error) => {
              console.error("Error fetching months:", error);
            }
          );
        });
      };

      fetchMonths();
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const fetchCosts = async () => {
        const db = await dbPromise();
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT service, SUM(amount) as totalAmount FROM ${TABLE_NAME} WHERE year = ? AND month = ? GROUP BY service;`,
            [selectedYear, selectedMonth],
            (_, result) => {
              const data = result.rows._array;
              setCosts(data);
            },
            (_, error) => {
              console.error("Error fetching costs:", error);
            }
          );
        });
      };

      fetchCosts();
    }
  }, [selectedYear, selectedMonth]);

  return (
    <View style={{ padding: 20 }}>
      <Text>Перегляд витрат</Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <RNPickerSelect
          placeholder={{ label: "Виберіть рік", value: null }}
          items={years}
          onValueChange={(value) => setSelectedYear(value)}
          style={{ inputAndroid: { width: 150, marginRight: 10 } }}
          value={selectedYear}
        />

        <RNPickerSelect
          placeholder={{ label: "Виберіть місяць", value: null }}
          items={months}
          onValueChange={(value) => setSelectedMonth(value)}
          style={{ inputAndroid: { width: 150 } }}
          value={selectedMonth}
        />
      </View>

      {/* Додаємо блоки для відображення витрат */}
      {costs.map((item, index) => (
        <View key={index} style={styles.costBlock}>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Text style={styles.totalAmount}>{item.totalAmount}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  costBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0", // Змініть колір за потребою
    borderRadius: 5,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 16,
  },
});

export default ViewScreen;
