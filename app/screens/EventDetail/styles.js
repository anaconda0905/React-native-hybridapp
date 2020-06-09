import React from "react";
import { StyleSheet, Platform } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  imgBanner: {
    width: "100%",
    height: 250,
    position: "absolute"
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 5
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  contentButtonBottom: {
    borderTopColor: BaseColor.textSecondaryColor,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemPrice: {
    borderBottomWidth: 1,
    borderColor: BaseColor.textSecondaryColor,
    paddingVertical: 10
  },
  linePrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  wrapContent: {
    flexWrap: "wrap",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: BaseColor.textSecondaryColor,
    paddingBottom: 20
  }
});
