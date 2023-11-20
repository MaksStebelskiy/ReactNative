
import React, { useState } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const ViewScreen = ({ }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const years = [
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    
  ];

  const months = [
    { label: "Січень", value: "01" },
    { label: "Лютий", value: "02" },
    
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text>Сторінка витрат</Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        
        <RNPickerSelect
          placeholder={{ label: "Виберіть рік", value: null }}
          items={years}
          onValueChange={(value) => setSelectedYear(value)}
          style={{ inputAndroid: { width: 150, marginRight: 10 } }}
          value={selectedYear}
        />

        {/* Випадаючий список для вибору місяця */}
        <RNPickerSelect
          placeholder={{ label: "Виберіть місяць", value: null }}
          items={months}
          onValueChange={(value) => setSelectedMonth(value)}
          style={{ inputAndroid: { width: 150 } }}
          value={selectedMonth}
        />
      </View>
    </View>
  );
};

export default ViewScreen;
