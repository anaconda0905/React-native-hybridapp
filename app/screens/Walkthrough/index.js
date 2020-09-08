import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, TouchableOpacity, ScrollView, LogBox, I18nManager, Alert, ToastAndroid } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image, Icon } from "@components";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";
import { LangData } from "@data";
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput } from 'react-native-paper';
import database from '@react-native-firebase/database';


class Walkthrough extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            scrollEnabled: true,
            cca2: 'US',
            input_text: '',
            status: '',
            search_index: '',
            slide: [
                { key: 1, image: Images.trip2 },
            ]
        };
    }

    onSearch() {

        let { search_index, input_text, status } = this.state;
        const emailRegex = /^\S+@\S+\.\S+$/;
        const phoneRegEx = /^[+\s.]?[0-9]{1,3}?[0-9]{3}?[-\s.]?[0-9]{2,3}[-/\s.]?[0-9]{4}$/;
        if (input_text == '') {
            Alert.alert('Search failed', 'Please input correctly.');
        }
        else {
            switch (search_index) {
                case 0:
                    if (phoneRegEx.test(input_text)) {
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
                                    ToastAndroid.show("Search result successfully retrieved!", ToastAndroid.LONG);
                                }
                                else {
                                    ToastAndroid.show("No result!", ToastAndroid.LONG);
                                }
                            });

                    }
                    else {
                        Alert.alert('Search failed', 'Please input mobile number correctly.');
                    }
                    break;
                case 1:
                    if (emailRegex.test(input_text)) {
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

                                    ToastAndroid.show("Search result successfully retrieved!", ToastAndroid.LONG);
                                }
                                else {
                                    ToastAndroid.show("No result!", ToastAndroid.LONG);
                                }
                            });

                    }
                    else {
                        Alert.alert('Search failed', 'Please input email correctly.');
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
                                ToastAndroid.show("Search result successfully retrieved!", ToastAndroid.LONG);
                            }
                            else {
                                ToastAndroid.show("No result!", ToastAndroid.LONG);
                            }
                        });
                    break;
                default:
                    Alert.alert('Search failed', 'Please select search type!');
                    break;
            }

        }
    }

    render() {

        let { lang } = {};
        if (this.props.auth.user.lang == "Arabic") {
            lang = LangData.arabic;
            I18nManager.forceRTL(true);

        }
        else {
            lang = LangData.en;
            I18nManager.forceRTL(false);
        }

        const { navigation } = this.props;

        let data = [{
            value: 'Mobile number',
        }, {
            value: 'Email',
        }, {
            value: 'Snapchat',
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
                                Eng/Arabic
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
                                            Relationship status
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
                        <Text style={BaseStyle.textInput}>
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
