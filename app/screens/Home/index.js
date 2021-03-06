import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, ToastAndroid } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, DatePicker, SafeAreaView, Icon, Text, Button, Image } from "@components";
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput } from 'react-native-paper';
import messaging from "@react-native-firebase/messaging";
import SendSMS from 'react-native-sms';
import { LangData } from "@data";
import { FirebaseServices, NotificationServices } from '../../services'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import styles from "./styles";
import * as Utils from "@utils";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: LangData.en,
            phoneNum1: "",
            phoneNum2: "",
            fName: "",
            lName: '',
            email: '',
            phoneNum: '',
            snapChat: '',
            loading: false,
            userToken: [],
        };
    }

    componentDidMount() {


        FirebaseServices.getProfileByUid(this.props.auth.login.uid, (info) => {
            this.setState({
                fName: info.fName,
                lName: info.lName,
                email: info.email,
                phoneNum: info.mobileNumber,
                phoneNum1: info.mobileNumber,
                snapChat: info.snapChat
            });
        });
        this.initNotification();
        const { navigation } = this.props;
        if (this.props.auth.login.success == true) {
            messaging()
                .getToken()
                .then((token) => {
                    this.setState({ userToken: [token] });
                    FirebaseServices.updateProfileTokenByUid(this.props.auth.login.uid, token);
                });

        }
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
        this.props.auth.user.lang
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.user.lang == "Arabic") {
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

    initNotification() {
        // foreground
        messaging().onMessage(async (remoteMessage) => {
            console.log('A new FCM message arrived!', remoteMessage);
            this.props.actions.fromnotification(remoteMessage.data.type, response => {
                console.log(response.success);
            });
            NotificationServices.showNotification(remoteMessage.data.title, remoteMessage.data.msg);
        });
    }

    onSend() {
        const { phoneNum1, phoneNum2, userToken, phoneNum, fName, lName } = this.state;
        let title = "Could I have a relationship with you?";
        let phoneNumTo = Utils.formatPhoneNumber(phoneNum2);
        let code = Math.floor(100000 + Math.random() * 900000);
        let name_title = fName + " " + lName;
        let name = Utils.getAvatarName(fName, lName);
        let date = Utils.getCurrentDate();
        let description = "Verification code is " + code;
        if (fName == "" || userToken == "") {
            ToastAndroid.show("Just wait a min. Please try again.", ToastAndroid.LONG);
        } else {
            if (phoneNum1 == "" || phoneNum2 == "") {
                showMessage({
                    message: "Please inputy correctly",
                    type: "danger",
                    icon: 'auto',
                });
            }
            else if (!Utils.phoneRegEx.test(phoneNum2)) {
                showMessage({
                    message: "Please input mobile number correctly",
                    type: "danger",
                    icon: 'auto',
                });
            }
            else {
                FirebaseServices.saveCodebyPhone(phoneNum, phoneNumTo, name_title, name, description, date, code);
                FirebaseServices.getTokenByPhone(phoneNumTo, (token) => {
                    if (token) {
                        console.log(token);

                        const body = {
                            registration_ids: token,
                            notification: {
                                title: title,
                                body: 'Verification code is ' + code,
                                icon: 'notification_icon',
                            },
                            data: {
                                type: phoneNum,
                                code: code,
                                msg: 'Verification code is ' + code,
                                title: title,
                            },
                        };
                        FirebaseServices.sendNotification(body);
                    }
                });

            }
        }
    }

    onSend1() {
        const { navigation } = this.props;
        navigation.navigate("SaveCode");
        const { phoneNum2 } = this.state;
        let msg = "";
        let type = "";
        if (Utils.phoneRegEx.test(phoneNum2)) {
            SendSMS.send({
                //Message body
                body: 'Please follow me',
                //Recipients Number
                recipients: ['8616558195081'],
                //An array of types that would trigger a "completed" response when using android
                successTypes: ['sent', 'queued']
            }, (completed, cancelled, error) => {
                if (completed) {
                    msg = 'SMS Sent Completed';
                    type = 'success';
                } else if (cancelled) {
                    msg = 'SMS Sent Cancelled';
                    type = 'info';
                } else if (error) {
                    msg = 'Some error occured';
                    type = 'danger';
                }
                showMessage({
                    message: msg,
                    type: type,
                    icon: 'auto',
                });
            });
        }
        else {
            showMessage({
                message: 'Please input mobile number correctly!',
                type: 'danger',
                icon: 'auto',
            });
        }
    }

    render() {
        const { navigation } = this.props;
        const { lang } = this.state;
        let data = [{
            value: lang.married,
        }, {
            value: lang.inrelation,
        }];
        return (
            <>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title={lang.title}
                        renderRight={() => {
                            return (
                                <Icon name="bell" size={24} color={BaseColor.primaryColor} />
                            );
                        }}
                        onPressRight={() => {
                            navigation.navigate("Notification");
                        }}
                    />
                    <ScrollView>
                        <View style={styles.contain}>
                            <Image source={Images.trip2} style={styles.logo} resizeMode="contain" />
                        </View>

                        <View style={styles.contain}>
                            <View style={styles.containPhone}>
                                <Text style={BaseStyle.label}>{lang.areacode}</Text>
                                <TextInput
                                    style={[BaseStyle.textInputPhone, { marginTop: 5 }]}
                                    onChangeText={text => this.setState({ phoneNum1: text })}
                                    autoCorrect={false}
                                    keyboardType="phone-pad"
                                    value={this.state.phoneNum1}
                                    selectionColor={BaseColor.primaryColor}
                                />
                            </View>
                            <View style={{ width: "100%" }}>
                                <Dropdown
                                    label={lang.iam}
                                    data={data}
                                />
                            </View>

                            <View style={{ width: "20%" }}>
                                <Text style={BaseStyle.textInput2}>
                                    {lang.to}
                                </Text>
                            </View>
                            <View style={styles.containPhone}>
                                <Text style={BaseStyle.label}>{lang.areacode}</Text>
                                <TextInput
                                    style={[BaseStyle.textInputPhone, { marginTop: 5 }]}
                                    onChangeText={text => this.setState({ phoneNum2: text })}
                                    autoCorrect={false}
                                    keyboardType="phone-pad"
                                    value={this.state.phoneNum2}
                                    selectionColor={BaseColor.primaryColor}
                                />
                            </View>

                            <View style={{ width: "100%" }}>
                                <Button
                                    full
                                    loading={this.state.loading}
                                    style={{ marginTop: 10, height: 46 }}
                                    onPress={() => {
                                        this.onSend();
                                    }}
                                >
                                    {lang.havearelation}
                                </Button>

                                <Button
                                    full
                                    style={{ marginTop: 10, height: 46 }}
                                    onPress={() => {
                                        this.onSend1();
                                    }}
                                >
                                    {lang.endarelation}
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
