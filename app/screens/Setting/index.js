import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { BaseStyle, BaseColor, BaseSetting } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
} from "@components";
import styles from "./styles";

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    /**
     * @description Simple logout with Redux
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onLogOut() {
        const {navigation} = this.props;

        this.setState(
            {
                loading: true
            },
            () => {
                this.props.actions.authentication(false, response => {});
                navigation.navigate("Loading");
            }
        );
    }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Setting"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        return (
                            <Icon name="bell" size={24} color={BaseColor.primaryColor} />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("Notification");
                    }}
                />
                <ScrollView>
                    <View style={styles.contain}>

                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                style={styles.profileItem}
                                onPress={() => {
                                    navigation.navigate("ProfileEdit");
                                }}
                            >
                                <Text body1>Edit Profile</Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.profileItem}
                                onPress={() => {
                                    navigation.navigate("ChangePassword");
                                }}
                            >
                                <Text body1>Change Password</Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>

                            <View style={styles.profileItem}>
                                <Text body1>App Version</Text>
                                <Text body1 grayColor>
                                    {BaseSetting.appVersion}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ padding: 20 }}>
                    <Button full loading={loading} onPress={() => this.onLogOut()}>
                        Sign Out
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
