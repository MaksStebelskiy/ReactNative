import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  yearPicker: {
    inputAndroid: {
      width: 165,
      marginLeft: -10,
      marginRight: 5,
    },
  },
  monthPicker: {
    inputAndroid: {
      width: 165,
    },
  },
  
  costBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  leftBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  totalAmount: {
    fontSize: 16,
    alignItems: "flex-end",
  },
  serviceIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  totalBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 15,
    backgroundColor: "green",
    borderRadius: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
