import React, {Component} from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import {BaseStyle, BaseColor} from "@config";
import {Header, SafeAreaView, Icon, Text} from "@components";
import styles from "./styles";

// Load sample language data list
import {LanguageData} from "@data";
import {connect} from "react-redux";
import {AuthActions} from "@actions";
import {bindActionCreators} from "redux";

class ChangeLanguage extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            country: "",
            language: LanguageData,
            loading: false
        };
    }

    componentDidMount(){
        this.setState({
            language: this.state.language.map(item => {
                if (item.language == this.props.auth.user.lang) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }
            })
        });
    }
    /**
     * @description Called when setting language is selected
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @param {object} select
     */
    onChange(select) {

        this.setState({
            language: this.state.language.map(item => {
                this.setState({country: select.language});
                if (item.language == select.language) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }
            })
        });
    }

    render() {
        const {navigation} = this.props;
        let {language} = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{top: "always"}}
            >
                <Header
                    title="Change Language"
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
                        if (this.state.loading) {
                            return (
                                <ActivityIndicator
                                    size="small"
                                    color={BaseColor.primaryColor}
                                />
                            );
                        } else {
                            return (
                                <Text headline primaryColor>
                                    Save
                                </Text>
                            );
                        }
                    }}
                    onPressLeft={() => {
                        navigation.navigate("Walkthrough");
                    }}
                    onPressRight={() => {
                        this.setState(
                            {
                                loading: true
                            },
                            () => {
                                setTimeout(() => {
                                    this.setState({
                                        loading: false
                                    });
                                    this.props.actions.changelanguage(this.state.country, response => {});
                                    navigation.navigate("Walkthrough");
                                }, 500);
                            }
                        );
                    }}
                />
                <View style={styles.contain}>
                    <View style={{width: "100%", height: "100%"}}>
                        <FlatList
                            data={language}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => this.onChange(item)}
                                >
                                    <Text
                                        body1
                                        style={
                                            item.checked
                                                ? {
                                                    color: BaseColor.primaryColor
                                                }
                                                : {}
                                        }
                                    >
                                        {item.language}
                                    </Text>
                                    {item.checked && (
                                        <Icon
                                            name="check"
                                            size={14}
                                            color={BaseColor.primaryColor}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth:state.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage);