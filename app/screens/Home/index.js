import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, DatePicker, SafeAreaView, Icon, Text, Button, Image } from "@components";
import styles from "./styles";
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput } from 'react-native-paper';
import messaging from "@react-native-firebase/messaging";
import SendSMS from 'react-native-sms';
import {FirebaseServices} from '../../services'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: "",
            loading: false,
            success: {
                id: true,
                password: true
            },
            userToken: "",
        };
    }

    componentDidMount() {
        messaging()
            .getToken()
            .then((token) => {
                this.setState({ userToken: token });
            });
        this.initNotification();
    }

    initNotification() {
        // foreground
        messaging().onMessage(async (remoteMessage) => {
            console.log('A new FCM message arrived!', remoteMessage);
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
        SendSMS.send({
            //Message body
            body: 'Please follow me',
            //Recipients Number
            recipients: ['15904557869'],
            //An array of types that would trigger a "completed" response when using android
            successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => {
            if (completed) {
                console.log('SMS Sent Completed');
            } else if (cancelled) {
                console.log('SMS Sent Cancelled');
            } else if (error) {
                console.log('Some error occured');
            }
        });
    }

    render() {
        const { navigation } = this.props;
        let data = [{
            value: 'Married',
        }, {
            value: 'In Relation',
        }];
        return (
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
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 15 }]}
                            onChangeText={text => this.setState({ id: text })}
                            onFocus={() => {
                                this.setState({
                                    success: {
                                        ...this.state.success,
                                        id: true
                                    }
                                });
                            }}
                            autoCorrect={false}
                            placeholder="Mobile Number"
                            placeholderTextColor={
                                this.state.success.id
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={this.state.id}
                            selectionColor={BaseColor.primaryColor}
                        />
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

                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text => this.setState({ password: text })}
                            onFocus={() => {
                                this.setState({
                                    success: {
                                        ...this.state.success,
                                        password: true
                                    }
                                });
                            }}
                            autoCorrect={false}
                            placeholder="Mobile Number"
                            // secureTextEntry={true}
                            placeholderTextColor={
                                this.state.success.password
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={this.state.password}
                            selectionColor={BaseColor.primaryColor}
                        />

                        <View style={{ width: "100%", marginTop: 20 }}>
                            <Button
                                full
                                loading={this.state.loading}
                                style={{ marginTop: 20, height: 46 }}
                                onPress={() => {
                                    this.onSend();
                                }}
                            >
                                Send notification
                            </Button>

                            <Button
                                full
                                style={{ marginTop: 20, height: 46 }}
                                onPress={() => {
                                    this.onSend1();
                                }}
                            >
                                Cancel Relation
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
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
