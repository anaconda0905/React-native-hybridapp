import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, DatePicker, SafeAreaView, Icon, Text, Button, Image } from "@components";
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput } from 'react-native-paper';
import messaging from "@react-native-firebase/messaging";
import SendSMS from 'react-native-sms';
import { FirebaseServices, NotificationServices } from '../../services'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import styles from "./styles";
import * as Utils from "@utils";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNum1: "",
            phoneNum2: "",
            loading: false,
            success: {
                phoneNum1: true,
                phoneNum2: true
            },
            userToken: [],
        };
    }

    componentDidMount() {
        // console.log(Utils.formatPhoneNumber("2345678900"));
        // console.log(Utils.phoneRegEx.test(2345678900));
        const { navigation } = this.props;
        if (this.props.auth.login.success == true) {
            messaging()
                .getToken()
                .then((token) => {
                    this.setState({ userToken: [token] });
                    FirebaseServices.updateProfileTokenByUid(this.props.auth.login.uid, token);
                });
            this.initNotification();
            FirebaseServices.getProfileByUid(this.props.auth.login.uid, (info) => {
                this.setState({
                    phoneNum1: info.mobileNumber
                });
            });
        }
    }

    initNotification() {
        // foreground
        messaging().onMessage(async (remoteMessage) => {
            console.log('A new FCM message arrived!', remoteMessage);
            NotificationServices.showNotification(remoteMessage.data.title, remoteMessage.data.msg);
        });

    }

    onSend() {
        const { userToken } = this.state;
        const msg = "Could I have a relationship with you?";
        const body = {
            registration_ids: userToken,
            notification: {
                title: 'Relationship Status',
                body: msg,
                icon: 'notification-icon',
            },
            data: {
                type: 'chat',
                msg: msg,
                title: 'Relationship Status',
            },
        };
        FirebaseServices.sendNotification(body);
    }

    onSend1() {
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
        let data = [{
            value: 'Married',
        }, {
            value: 'In Relation',
        }];
        return (
            <>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title="Relationship Status"
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
                                <Text style={BaseStyle.label}>+966</Text>
                                <TextInput
                                    style={[BaseStyle.textInputPhone, { marginTop: 5 }]}
                                    onChangeText={text => this.setState({ phoneNum1: text })}
                                    onFocus={() => {
                                        this.setState({
                                            success: {
                                                ...this.state.success,
                                                phoneNum1: true
                                            }
                                        });
                                    }}
                                    autoCorrect={false}
                                    placeholder="Mobile Number"
                                    placeholderTextColor={
                                        this.state.success.phoneNum1
                                            ? BaseColor.grayColor
                                            : BaseColor.primaryColor
                                    }
                                    editable={false}
                                    value={this.state.phoneNum1}
                                    selectionColor={BaseColor.primaryColor}
                                />
                            </View>
                            <View style={{ width: "100%" }}>
                                <Dropdown
                                    label='I AM ...'
                                    data={data}
                                />
                            </View>

                            <View style={{ width: "20%" }}>
                                <Text style={BaseStyle.textInput2}>
                                    To
                                </Text>
                            </View>
                            <View style={styles.containPhone}>
                                <Text style={BaseStyle.label}>+966</Text>
                                <TextInput
                                    style={[BaseStyle.textInputPhone, { marginTop: 5 }]}
                                    onChangeText={text => this.setState({ phoneNum2: text })}
                                    onFocus={() => {
                                        this.setState({
                                            success: {
                                                ...this.state.success,
                                                phoneNum2: true
                                            }
                                        });
                                    }}
                                    autoCorrect={false}
                                    placeholder="Mobile Number"
                                    // secureTextEntry={true}
                                    placeholderTextColor={
                                        this.state.success.phoneNum2
                                            ? BaseColor.grayColor
                                            : BaseColor.primaryColor
                                    }
                                    value={this.state.phoneNum2}
                                    selectionColor={BaseColor.primaryColor}
                                />
                            </View>

                            <View style={{ width: "100%" }}>
                                <Button
                                    full
                                    loading={this.state.loading}
                                    style={{ marginTop: 20, height: 46 }}
                                    onPress={() => {
                                        this.onSend();
                                    }}
                                >
                                    Have a relationship
                                </Button>

                                <Button
                                    full
                                    style={{ marginTop: 20, height: 46 }}
                                    onPress={() => {
                                        this.onSend1();
                                    }}
                                >
                                    End a relationship
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
