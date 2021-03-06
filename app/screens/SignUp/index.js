import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, Alert, Switch } from "react-native";
import { TextInput } from 'react-native-paper';
import { BaseStyle, BaseColor } from "@config";
import styles from "./styles";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
} from "@components";
import * as Utils from "@utils";
import { LangData } from "@data";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import FlashMessage, { showMessage } from 'react-native-flash-message';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: LangData.en,
            reminders: false,
            first_name: "",
            last_name: "",
            mobile_number: "",
            snapchat: "",
            email: "",
            password: "",
            loading: false,

            success: {
                first_name: true,
                last_name: true,
                mobile_number: true,
                snapchat: true,
                email: true,
                password: true,
                reminders: true
            }
        };
    }

    onSignUp() {
        const { lang } = this.state;
        const { navigation } = this.props;
        let { first_name, last_name, mobile_number, snapchat, email, password, success, reminders } = this.state;

        if (first_name == "" || last_name == "" || email == "" || snapchat == "" || password == "" || mobile_number == "" || reminders == false) {
            this.setState({
                success: {
                    ...success,
                    first_name: first_name != "" ? true : false,
                    last_name: last_name != "" ? true : false,
                    mobile_number: mobile_number != "" ? true : false,
                    snapchat: snapchat != "" ? true : false,
                    email: email != "" ? true : false,
                    password: password != "" ? true : false,
                    reminders: reminders != false ? true : false
                }
            });
        } else if (Utils.formatPhoneNumber(mobile_number) == null) {
            Alert.alert(lang.register_failed, lang.input_mobile_correclty);
        } else {
            this.setState({mobile_number:Utils.formatPhoneNumber(mobile_number)});
            this.setState(
                {
                    loading: true
                },
                () => {
                    if (Utils.phoneRegEx.test(mobile_number) && Utils.emailRegex.test(email)) {
                        auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                // console.log('User account created & signed in!');
                                const uid = auth().currentUser.uid;

                                database()
                                    .ref('/users/' + uid)
                                    .set({
                                        email: email,
                                        fName: first_name,
                                        lName: last_name,
                                        mobileNumber: mobile_number,
                                        password: password,
                                        snapChat: snapchat,
                                        status: 'UnKnown',
                                        uuid: uid
                                    })
                                    .then(() => console.log('Data set to user table.'));

                                showMessage({
                                    message: lang.user_created_signin,
                                    type: 'success',
                                    icon: 'auto',
                                });
                                this.props.actions.authentication(true, uid, response => { });
                                setTimeout(() => {
                                    navigation.navigate("Home");
                                }, 2000);

                            })
                            .catch(error => {
                                console.log(error.code);
                                let alertMsg = '';
                                switch (error.code) {
                                    case 'auth/email-already-in-use':
                                        alertMsg = lang.email_already_used;
                                        break;
                                    case 'auth/invalid-email':
                                        alertMsg = lang.email_isinvalid;
                                        break;
                                    case 'auth/operation-not-allowed':
                                        alertMsg = lang.operation_not_allowed;
                                        break;
                                    case 'auth/weak-password':
                                        alertMsg = lang.password_not_strong;
                                        break;
                                    default:
                                        alertMsg = lang.error_signup + error.code;
                                        break;
                                }
                                Alert.alert(lang.register_failed, alertMsg);
                            });
                    }
                    else {
                        Alert.alert(lang.register_failed, lang.email_phone_error);
                    }
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 2000);
                }
            );
        }
    }

    componentDidMount() {
        if (this.props.auth.user.lang == "Arabic") {
            this.setState({
                lang: LangData.arabic
            });
        }
        else {
            this.setState({
                lang: LangData.en
            });
        }
    }

    /**
     * @description Call when reminder option switch on/off
     */
    toggleSwitch = value => {
        this.setState({ reminders: value });
    };

    render() {
        const { navigation } = this.props;
        const { lang } = this.state;
        let { loading, first_name, last_name, mobile_number, snapchat, email, password, success } = this.state;
        return (
            <>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title={lang.signup}
                        renderLeft={() => {
                            return (
                                <Icon
                                    name="arrow-left"
                                    size={20}
                                    color={BaseColor.primaryColor}
                                />
                            );
                        }}

                        onPressLeft={() => {
                            navigation.navigate("Walkthrough");
                        }}

                    />
                    <ScrollView>
                        <View style={styles.contain}>
                            <TextInput
                                style={[BaseStyle.textInput_walk, { marginTop: 25 }]}
                                onChangeText={text => this.setState({ first_name: text })}
                                autoCorrect={false}
                                label={lang.firstName}
                                placeholderTextColor={
                                    success.first_name ? BaseColor.grayColor : BaseColor.primaryColor
                                }
                                value={first_name}
                                mode='outlined'
                            />
                            <TextInput
                                style={[BaseStyle.textInput_walk, { marginTop: 10 }]}
                                onChangeText={text => this.setState({ last_name: text })}
                                autoCorrect={false}
                                label={lang.lasttName}
                                placeholderTextColor={
                                    success.last_name ? BaseColor.grayColor : BaseColor.primaryColor
                                }
                                value={last_name}
                                mode='outlined'
                            />
                            <View style={styles.containPhone}>
                                <Text style={BaseStyle.label}>{lang.areacode}</Text>
                                <TextInput
                                    style={[BaseStyle.textInputPhone, { marginTop: 10, }]}
                                    onChangeText={text => this.setState({ mobile_number: text })}
                                    autoCorrect={false}
                                    placeholder={lang.mobileNumber}
                                    keyboardType="phone-pad"
                                    placeholderTextColor={
                                        success.mobile_number ? BaseColor.grayColor : BaseColor.primaryColor
                                    }
                                    value={mobile_number}
                                />
                            </View>
                            <TextInput
                                style={[BaseStyle.textInput_walk, { marginTop: 10 }]}
                                onChangeText={text => this.setState({ snapchat: text })}
                                autoCorrect={false}
                                label={lang.snapchat}
                                mode='outlined'
                                placeholderTextColor={
                                    success.snapchat ? BaseColor.grayColor : BaseColor.primaryColor
                                }
                                value={snapchat}
                            />
                            <TextInput
                                style={[BaseStyle.textInput_walk, { marginTop: 10 }]}
                                onChangeText={text => this.setState({ email: text })}
                                autoCorrect={false}
                                label={lang.email}
                                mode='outlined'
                                keyboardType="email-address"
                                placeholderTextColor={
                                    success.email ? BaseColor.grayColor : BaseColor.primaryColor
                                }
                                value={email}
                            />
                            <TextInput
                                style={[BaseStyle.textInput_walk, { marginTop: 10 }]}
                                onChangeText={text => this.setState({ password: text })}
                                autoCorrect={false}
                                label={lang.password}
                                mode='outlined'
                                placeholderTextColor={
                                    success.password ? BaseColor.grayColor : BaseColor.primaryColor
                                }
                                value={password}
                            />
                            <View style={styles.profileItem}>
                                <Switch
                                    name="angle-right"
                                    size={18}
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.reminders}
                                />
                                <Text style={{ color: BaseColor.grayColor }}>{lang.terms}</Text>
                            </View>
                            <View style={{ width: "100%" }}>
                                <Button
                                    full
                                    style={{ marginTop: 20 }}
                                    loading={loading}
                                    onPress={() => this.onSignUp()}
                                >
                                    {lang.saveandlogin}
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <FlashMessage position="top" />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);