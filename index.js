/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "app/index.js";
import { BaseSetting } from "@config";
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(BaseSetting.name, () => App);
