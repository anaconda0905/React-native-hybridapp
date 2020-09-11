import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, TouchableOpacity, ScrollView, LogBox, I18nManager, Alert, ToastAndroid } from "react-native";
import { SafeAreaView, Text, Button, Image, Icon } from "@components";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";
import { LangData } from "@data";
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput } from 'react-native-paper';
import database from '@react-native-firebase/database';
import RNRestart from 'react-native-restart';

class Walkthrough extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            scrollEnabled: true,
            lang: LangData.en,
            input_text: '',
            status: '',
            search_index: '',
            slide: [
                { key: 1, image: Images.trip2 },
            ]
        };
    }

    onSearch() {

        let { search_index, input_text, status, lang } = this.state;
        if (input_text == '') {
            Alert.alert(lang.searchfailed, lang.input_correctly);
        }
        else {
            switch (search_index) {
                case 0:
                    if (Utils.phoneRegEx.test(input_text)) {
                        database()
                            .ref('users')
                            .orderByChild('mobileNumber')
                            .equalTo(input_text)
                            .once('value', (snapshot) => {
                                const teams = snapshot.val();

                                if (teams) {
                                    Object.keys(teams).forEach((key) => {
                                        this.setState({ status: teams[key].status });
                                    });
                                    ToastAndroid.show(lang.search_result, ToastAndroid.LONG);
                                }
                                else {
                                    ToastAndroid.show(lang.no_result, ToastAndroid.LONG);
                                }
                            });

                    }
                    else {
                        Alert.alert(lang.searchfailed, lang.input_mobile_correclty);
                    }
                    break;
                case 1:
                    if (Utils.emailRegex.test(input_text)) {
                        database()
                            .ref('users')
                            .orderByChild('email')
                            .equalTo(input_text)
                            .once('value', (snapshot) => {
                                const teams = snapshot.val();

                                if (teams) {
                                    Object.keys(teams).forEach((key) => {
                                        this.setState({ status: teams[key].status });
                                    });

                                    ToastAndroid.show(lang.search_result, ToastAndroid.LONG);
                                }
                                else {
                                    ToastAndroid.show(lang.no_result, ToastAndroid.LONG);
                                }
                            });

                    }
                    else {
                        Alert.alert(lang.searchfailed, lang.input_email_correclty);
                    }
                    break;
                case 2:
                    database()
                        .ref('users')
                        .orderByChild('snapChat')
                        .equalTo(input_text)
                        .once('value', (snapshot) => {
                            const teams = snapshot.val();
                            console.log(teams);
                            if (teams) {
                                Object.keys(teams).forEach((key) => {
                                    this.setState({ status: teams[key].status });
                                });
                                ToastAndroid.show(lang.search_result, ToastAndroid.LONG);
                            }
                            else {
                                ToastAndroid.show(lang.no_result, ToastAndroid.LONG);
                            }
                        });
                    break;
                default:
                    Alert.alert(lang.searchfailed, lang.select_type);
                    break;
            }

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
        this.props.auth.user.lang
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.user.lang == "Arabic") {
            this.setState({
                lang: LangData.arabic
            });
            I18nManager.forceRTL(true);

            // Alert.alert(
            //     'Reload this page',
            //     'Please reload this page to change the UI direction! ' +
            //     'All components in this app will be affected. ' +
            //     'Check them out to see what they look like in RTL layout.'
            // );
        }
        else {
            this.setState({
                lang: LangData.en
            });
            I18nManager.forceRTL(false);

            // Alert.alert(
            //     'Reload this page',
            //     'Please reload this page to change the UI direction! ' +
            //     'All components in this app will be affected. ' +
            //     'Check them out to see what they look like in LTR layout.'
            // );
        }
        RNRestart.Restart();

    }

    render() {

        let { lang } = this.state;
        const { navigation } = this.props;

        let data = [{
            value: lang.mobileNumber,
        }, {
            value: lang.email,
        }, {
            value: lang.snapchat,
        }];


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <ScrollView
                    style={styles.contain}
                    scrollEnabled={this.state.scrollEnabled}
                    onContentSizeChange={(contentWidth, contentHeight) =>
                        this.setState({
                            scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight)
                        })
                    }
                >
                    <View style={styles.contentActionTop}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("ChangeLanguage");
                        }}>
                            <Text body1 primaryColor>
                                {lang.changeLang}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.userplus}>
                            <Icon name="user-plus" color={BaseColor.primaryColor} size={30} solid />
                        </TouchableOpacity>
                    </View>
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
                    <View style={{ width: "100%" }}>
                        <Dropdown
                            style={{ marginLeft: 10 }}
                            label={lang.searchby}
                            data={data}
                            onChangeText={(value, index) => {
                                this.setState({ search_index: index });
                                this.setState({ input_text: '' });
                                this.setState({ status: '' });
                            }}
                        />

                        <TextInput
                            style={BaseStyle.textInput_walk}
                            onChangeText={text => this.setState({ input_text: text })}
                            autoCorrect={false}
                            placeholder=""
                            direction='rtl'
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.input_text}
                            selectionColor={BaseColor.primaryColor}
                        />

                        <Button
                            full
                            style={{ marginTop: 5 }}
                            loading={this.state.loading}
                            onPress={() => this.onSearch()}
                        >
                            {lang.search}
                        </Button>
                        <Text style={BaseStyle.textInputStatus}>
                            {this.state.status}
                        </Text>
                        <Button
                            full
                            style={{ marginTop: 5 }}
                            loading={this.state.loading}
                            onPress={() => navigation.navigate("SignIn")}
                        >
                            {lang.sigin}
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>

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

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
