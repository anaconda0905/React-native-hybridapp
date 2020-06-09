import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  btnClearSearch: {
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: "100%"
  },
  serviceItem: {
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  serviceCircleIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: BaseColor.lightPrimaryColor
  }
});
