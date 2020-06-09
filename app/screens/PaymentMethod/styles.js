import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  methodItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginBottom: 5
  },
  iconContent: {
    width: 30,
    marginRight: 10,
    alignItems: "center"
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%"
  }
});
