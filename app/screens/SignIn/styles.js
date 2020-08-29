import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%"
  },
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  logo: {
    width: 120,
    height: 120
  },
  contain: {
    paddingHorizontal: 20,
    marginVertical: 20
  },
  wrapper: {
    width: "100%",
    height: 250
  },
  contentPage: {
    bottom: 0
  },
  contentActionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  contentActionBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25
  },
  img: {
    width: Utils.scaleWithPixel(150),
    height: Utils.scaleWithPixel(150),
    borderRadius: Utils.scaleWithPixel(50) / 2
  },
  userplus:{
    alignItems: "flex-end", 
    justifyContent: "flex-end",
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  textSlide: {
    marginTop: 30
  },
});
