import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createStackNavigator} from "react-navigation-stack";
import {BaseColor, BaseStyle} from "@config";
import {Icon} from "@components";
import * as Utils from "@utils";

/* Stack Screen */
import ChangeLanguage from "@screens/ChangeLanguage";
import Notification from "@screens/Notification";
import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";
import SignUp1 from "@screens/SignUp1";
import Walkthrough from "@screens/Walkthrough";


// Transition for navigation by screen name
const handleCustomTransition = ({scenes}) => {
    const nextScene = scenes[scenes.length - 1].route.routeName;
    switch (nextScene) {
        case "PreviewImage":
            Utils.enableExperimental();
            return Utils.zoomIn();
        default:
            return false;
    }
};

// Config for bottom navigator
const bottomTabNavigatorConfig = {
    initialRouteName: "Home",
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: BaseColor.primaryColor,
        inactiveTintColor: BaseColor.grayColor,
        style: BaseStyle.tabBar,
        labelStyle: {
            fontSize: 12
        }
    }
};

// Tab bar navigation
const routeConfigs = {
    ChangeLanguage: {
        screen: ChangeLanguage,
        navigationOptions: ({navigation}) => ({
            title: "Language",
            tabBarIcon: ({focused, tintColor}) => {
                return <Icon solid color={tintColor} name="language" size={20} solid/>;
            }
        })
    },
    Home: {
        screen: SignUp1,
        navigationOptions: ({navigation}) => ({
            title: "Home",
            tabBarIcon: ({focused, tintColor}) => {
                return <Icon color={tintColor} name="home" size={20} solid/>;
            }
        })
    },
    Messenger: {
        screen: Notification,
        navigationOptions: ({navigation}) => ({
            title: "Notification",
            tabBarIcon: ({focused, tintColor}) => {
                return <Icon solid color={tintColor} name="bell" size={20} solid/>;
            }
        })
    }
};

// Define bottom navigator as a screen in stack
const BottomTabNavigator = createBottomTabNavigator(
    routeConfigs,
    bottomTabNavigatorConfig
);

// Main Stack View App
const StackNavigator = createStackNavigator(
    {
        BottomTabNavigator: {
            screen: BottomTabNavigator
        },
        ChangeLanguage: {
            screen: ChangeLanguage
        },
        Notification: {
            screen: Notification
        },

        SignIn: {
            screen: SignIn
        },
        SignUp: {
            screen: SignUp
        },
        SignUp1: {
            screen: SignUp1
        },
        Walkthrough: {
            screen: Walkthrough
        }
    },
    {
        headerMode: "none",
        initialRouteName: "BottomTabNavigator"
    }
);

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
    {
        StackNavigator: {
            screen: StackNavigator
        }
    },
    {
        mode: "modal",
        headerMode: "none",
        initialRouteName: "StackNavigator",
        transitionConfig: screen => {
            return handleCustomTransition(screen);
        }
    }
);

export default RootStack;
