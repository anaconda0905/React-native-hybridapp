import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  thumb: {
    borderWidth: 1,
    borderColor: BaseColor.whiteColor,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  couter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BaseColor.fieldColor,
    marginLeft: 5
  }
});
