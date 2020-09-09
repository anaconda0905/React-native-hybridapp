import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, CameraRoll, ToastAndroid } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Button, Image } from "@components";
import styles from "./styles";
import { TextInput } from 'react-native-paper';
import Swiper from "react-native-swiper";
import * as Utils from "@utils";
import { LangData } from "@data";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import FlashMessage, { showMessage } from 'react-native-flash-message';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: LangData.en,
            id: "",
            password: "",
            loading: false,
            success: {
                id: true,
                password: true
            },
            slide: [
                { key: 1, image: Images.trip2 },
            ]
        };
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

    onLogin() {

        const { id, password, success, lang } = this.state;
        const { navigation } = this.props;
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
                    // console.log("firebase auth implementation");
                    auth()
                        .signInWithEmailAndPassword(id, password)
                        .then(() => {
                            const uid = auth().currentUser.uid;
                            // console.log('Signed in successfully!');
                            showMessage({
                                message: lang.message_signin_success,
                                type: 'success',
                                icon: 'auto',
                            });
                            this.props.actions.authentication(true, uid, response => { });
                            setTimeout(() => {
                                navigation.navigate("Home");
                            }, 1000);
                        })
                        .catch(error => {
                            // console.log("error");
                            showMessage({
                                message: lang.input_correctly,
                                type: 'danger',
                                icon: 'auto',
                            });
                        });

                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 1000);
                }
            );
        }
    }

    render() {
        const { navigation } = this.props;
        const { lang } = this.state;
        let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
        return (
            <>
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title={lang.login}
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
                                                <Image source={item.image} style={styles.img} />
                                                <Text body1 style={styles.textSlide}>
                                                    {lang.title}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </Swiper>
                            </View>
                        </View>
                        <View style={{ width: "100%" }}>
                            <TextInput
                                style={BaseStyle.textInput_walk}
                                onChangeText={text => this.setState({ id: text })}
                                autoCorrect={false}
                                placeholder={lang.email}
                                placeholderTextColor={BaseColor.grayColor}
                                value={this.state.country}
                                selectionColor={BaseColor.primaryColor}
                            />
                            <TextInput
                                style={[BaseStyle.textInput_walk, { marginTop: 10 }]}
                                onChangeText={text => this.setState({ password: text })}
                                secureTextEntry={true}
                                autoCorrect={false}
                                placeholder={lang.password}
                                placeholderTextColor={BaseColor.grayColor}
                                value={this.state.country}
                                selectionColor={BaseColor.primaryColor}
                            />
                            <Button
                                full
                                loading={this.state.loading}
                                style={{ marginTop: 30 }}
                                onPress={() => {
                                    this.onLogin();
                                }}
                            >
                                {lang.login}
                            </Button>
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
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
