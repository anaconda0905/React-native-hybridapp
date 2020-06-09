import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: "center",
    padding: 20
  },
  paymentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 5,
    width: "100%",
    marginBottom: 15
  },
  iconContent: {
    width: 60,
    marginRight: 10,
    alignItems: "center"
  }
});
