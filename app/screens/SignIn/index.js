import React, {Component} from "react";
import {connect} from "react-redux";
import {AuthActions} from "@actions";
import {bindActionCreators} from "redux";
import {View, ScrollView, TouchableOpacity, CameraRoll, ToastAndroid} from "react-native";
import {BaseStyle, BaseColor, Images} from "@config";
import {Header, SafeAreaView, Icon, Text, Button, Image} from "@components";
import styles from "./styles";
import {TextInput} from 'react-native-paper';
import Swiper from "react-native-swiper";
import * as Utils from "@utils";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import FlashMessage, {showMessage} from 'react-native-flash-message';


class SignIn extends Component {
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
            slide: [
                {key: 1, image: Images.trip2},
            ]
        };
    }

    onLogin() {

        const {id, password, success} = this.state;
        const {navigation} = this.props;
        if (id == "" || password == "") {
            this.setState({
                success: {
                    ...success,
                    id: false,
                    password: false
                }
            });
        } else {
            this.setState(
                {
                    loading: true
                },
                () => {
                    // TODO conda
                    console.log("firebase auth implementation");
                    auth()
                        .signInWithEmailAndPassword(id, password)
                        .then(() => {
                            const uid = auth().currentUser.uid;
                            console.log('Signed in successfully!');
                            showMessage({
                                message: 'Signed in successfully!',
                                type: 'success',
                                icon: 'auto',
                            });
                            setTimeout(() => {
                                navigation.navigate("SignUp1");
                                this.props.actions.authentication(true, uid, response => {});
                            }, 2000);
                        })
                        .catch(error => {
                            console.log("error");
                            showMessage({
                                message: 'Please input email and password correctly!',
                                type: 'fail',
                                icon: 'auto',
                            });
                        });

                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 2000);
                }
            );
        }
    }

    render() {
        const {navigation} = this.props;
        let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
        return (
            <>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{top: "always"}}
                >
                    <Header
                        title="LogIn"
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
                            navigation.goBack();
                        }}
                    />
                    <ScrollView
                        style={styles.contain}
                        scrollEnabled={this.state.scrollEnabled}
                        onContentSizeChange={(contentWidth, contentHeight) =>
                            this.setState({
                                scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight)
                            })
                        }
                    >
                        <View style={styles.contain}>
                            <View style={styles.wrapper}>
                                {/* Images Swiper */}
                                <Swiper
                                    dotStyle={{
                                        backgroundColor: BaseColor.textSecondaryColor
                                    }}
                                    activeDotColor={BaseColor.primaryColor}
                                    paginationStyle={styles.contentPage}
                                    removeClippedSubviews={false}
                                >
                                    {this.state.slide.map((item, index) => {
                                        return (
                                            <View style={styles.slide} key={item.key}>
                                                <Image source={item.image} style={styles.img}/>
                                                <Text body1 style={styles.textSlide}>
                                                    Relationship status
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </Swiper>
                            </View>
                        </View>
                        <View style={{width: "100%"}}>
                            <TextInput
                                style={BaseStyle.textInput}
                                onChangeText={text => this.setState({id: text})}
                                autoCorrect={false}
                                placeholder="Email"
                                placeholderTextColor={BaseColor.grayColor}
                                value={this.state.country}
                                selectionColor={BaseColor.primaryColor}
                            />
                            <TextInput
                                style={BaseStyle.textInput}
                                onChangeText={text => this.setState({password: text})}
                                secureTextEntry={true}
                                autoCorrect={false}
                                placeholder="Password"
                                placeholderTextColor={BaseColor.grayColor}
                                value={this.state.country}
                                selectionColor={BaseColor.primaryColor}
                            />
                            <Button
                                full
                                loading={this.state.loading}
                                style={{marginTop: 30}}
                                onPress={() => {
                                    this.onLogin();
                                }}
                            >
                                LogIn
                            </Button>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <FlashMessage position="top"/>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
