/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "app/index.js";
import { BaseSetting } from "@config";

AppRegistry.registerComponent(BaseSetting.name, () => App);
