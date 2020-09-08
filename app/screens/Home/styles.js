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
    containPhone: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        alignItems: "center",
        width: "100%",
    },
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    logo: {
        width: Utils.scaleWithPixel(120),
        height: Utils.scaleWithPixel(120),
        borderRadius: Utils.scaleWithPixel(40) / 2,
        marginTop: 10,
    },
});
