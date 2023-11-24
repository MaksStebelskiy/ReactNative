import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { buttonStyles } from "./manageStyles";
import { handleDelete, DeleteMode } from "../../data/deleteDB";
import { handleAdd, AddMode } from "../../data/addDB";

const ManageScreen = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleDeletePress = async () => {
    await handleDelete(selectedYear, selectedMonth, selectedService);
  };

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
            Режим роботи:{" "}
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
                На даній сторінці ви можете керувати послугами: додавати нові
                послуги, редагувати існуючі послуги та видаляти їх. Для
                правильної роботи необхідно обрати всі параметри. Щоб змінити
                режим роботи, потрібно у випадаючому списку обрати потрібний
                режим.
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

        {mode === "add" &&
          AddMode(
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
          <DeleteMode
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            handleDelete={handleDeletePress}
          />
        )}

        <TouchableOpacity
          onPress={handleCancel}
          style={[
            buttonStyles.buttonContainer,
            {
              marginTop: 18,
              backgroundColor: "white",
              borderWidth: 2,
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
