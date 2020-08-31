import {createSwitchNavigator, createAppContainer} from "react-navigation";
import Main from "./main";
import Loading from "@screens/Loading";
import Walkthrough from "@screens/Walkthrough";
import ChangeLanguage from "@screens/ChangeLanguage";
import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";
import React from "react";

const AppNavigator = createSwitchNavigator(
    {
        Loading: Loading,
        Walkthrough: Walkthrough,
        ChangeLanguage: ChangeLanguage,
        SignIn: SignIn,
        SignUp: SignUp,
        Main: Main,
    },
    {
        initialRouteName: "Loading"
    }
);

export default createAppContainer(AppNavigator);
