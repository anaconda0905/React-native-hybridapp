import { StyleSheet } from "react-native";
import * as Utils from "@utils";
import { BaseColor } from "@config";
export default StyleSheet.create({
  imageBanner: {
    height: Utils.scaleWithPixel(120),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  content: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    width: Utils.scaleWithPixel(200)
  }
});
