import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

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
  qrcode:{
    marginTop: 50,
    marginBottom:30
  }
});