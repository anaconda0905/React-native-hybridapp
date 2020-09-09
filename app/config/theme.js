import { StyleSheet } from "react-native";
import { BaseColor } from "./color";

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
    tabBar: {
        borderTopWidth: 1
    },
    bodyPaddingDefault: {
        paddingHorizontal: 20
    },
    bodyMarginDefault: {
        marginHorizontal: 20
    },
    textInput2: {
        height: 46,
        marginTop: 10,
        backgroundColor: BaseColor.whiteColor,
        padding: 10,
        textAlign: "center",
        fontSize: 20,
        width: "100%",
        justifyContent: "center"
    },
    textInput1: {
        height: 46,
        marginTop: 20,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        textAlign: "center",
        fontSize: 17,
        width: "100%",
        justifyContent: "center"
    },
    textInput: {
        height: 46,
        marginTop: 5,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        width: "100%",
        justifyContent: "center"
    },
    textInputStatus: {
        height: 46,
        marginTop: 5,
        textAlign: "center",
        fontSize: 16,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%",
        justifyContent: "center"
    },
    textInputPhone: {
        height: 46,
        marginTop: 5,
        backgroundColor: BaseColor.whiteColor,
        borderRadius: 5,
        width: "85%",
        justifyContent: "center"
    },
    label: {
        marginTop: 10,
        fontSize: 16,
        width: "15%",
        textAlign:"left"
    },
    
    textInput_walk: {
        height: 46,
        backgroundColor: BaseColor.whiteColor,
        width: "100%",
        justifyContent: "center"
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: "white"
    }
});
