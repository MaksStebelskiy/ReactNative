import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import dbPromise from "../../data/manageDB";
import { monthNames, ukrainianServiceNames } from "./viewValues";
import { styles } from "./viewStyles";

const ViewScreen = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [costs, setCosts] = useState([]);
  const TABLE_NAME = "costs";

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
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Перегляд витрат
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require("../../assets/question.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ marginTop: 10, textAlign: "center" }}>
                На даній сторінці ви можете переглянути витрати на комунальні
                послуги за певний період. Оберіть потрібний рік та місяць і
                з'являться витрати за конкретні послуги та загальна сума.
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={{ color: "black", marginTop: 20, textAlign: "right" }}
                >
                  Закрити
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: "Рік", value: null }}
            items={years}
            onValueChange={(value) => setSelectedYear(value)}
            style={styles.yearPicker}
            value={selectedYear}
          />

          <RNPickerSelect
            placeholder={{ label: "Місяць", value: null }}
            items={months}
            onValueChange={(value) => setSelectedMonth(value)}
            style={styles.monthPicker}
            value={selectedMonth}
          />
        </View>

        {costs
          .sort((a, b) => {
            const serviceA =
              ukrainianServiceNames[a.service].name.toLowerCase();
            const serviceB =
              ukrainianServiceNames[b.service].name.toLowerCase();
            return serviceA.localeCompare(serviceB);
          })
          .map((item, index) => (
            <View key={index} style={styles.costBlock}>
              <View style={styles.leftBlock}>
                <Image
                  source={ukrainianServiceNames[item.service].image}
                  style={styles.serviceIcon}
                />
                <Text style={styles.serviceName}>
                  {ukrainianServiceNames[item.service].name}
                </Text>
              </View>
              <Text style={styles.totalAmount}>{item.totalAmount}</Text>
            </View>
          ))}

        <View style={styles.totalBlock}>
          <Text style={styles.totalLabel}>Загальна сума:</Text>
          <Text style={styles.totalAmount}>
            {costs
              .reduce((total, item) => total + item.totalAmount, 0)
              .toFixed(2)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewScreen;
