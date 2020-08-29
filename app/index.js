import React, {Component} from "react";
import {store, persistor} from "app/store";
import {StatusBar} from "react-native";
import {BaseColor} from "@config";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import App from "./navigation";
import messaging from '@react-native-firebase/messaging';

console.disableYellowBox = true;

export default class index extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
        await messaging().registerDeviceForRemoteMessages();
        await messaging().requestPermission();
    }

    render() {
        return (
            <Provider store={store}>
                {/* makes the redux store available to any nested components that have been wrapped in the connect() function */}
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        );
    }
}
