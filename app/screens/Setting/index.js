import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { BaseStyle, BaseColor, BaseSetting } from "@config";
import { LangData } from "@data";
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
            lang: LangData.en,
            loading: false,
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

    /**
     * @description Simple logout with Redux
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onLogOut() {
        const { navigation } = this.props;
        this.setState({ loading: true });
        this.props.actions.authentication(false, response => { });
        setTimeout(() => {
            navigation.navigate("Loading");
        }, 1000);

    }

    render() {
        const { navigation } = this.props;
        const { loading, lang } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title={lang.setting}
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
                <ScrollView>
                    <View style={styles.contain}>

                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                style={styles.profileItem}
                                onPress={() => {
                                    navigation.navigate("ProfileEdit");
                                }}
                            >
                                <Text body1>{lang.editprofile}</Text>
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
                                <Text body1>{lang.changepassword}</Text>
                                <Icon
                                    name="angle-right"
                                    size={18}
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />
                            </TouchableOpacity>

                            <View style={styles.profileItem}>
                                <Text body1>{lang.appversion}</Text>
                                <Text body1 grayColor>
                                    {BaseSetting.appVersion}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ padding: 20 }}>
                    <Button full loading={loading} onPress={() => this.onLogOut()}>
                        {lang.signout}
                    </Button>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
