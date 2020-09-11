import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { TextInput } from 'react-native-paper';
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import CodeInput from 'react-native-confirmation-code-input';
import styles from "./styles";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { LangData } from "@data";

class SaveCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            failed: false,
            code: '',
            loading: false
        };
    }

    onCodeChange = (code) => {
        this.setState({ code: code });
    };

    onFullFill(code) {
        const { failed } = this.state;
        if (!failed) {
            this.onVerify(code);
        }
    }

    onVerify = (code) => {
        console.log("verified", code);
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Save confirmation code"
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
                    <View style={styles.inputWrapper}>
                        <CodeInput
                            ref={(codeInput) => {
                                this.codeInput = codeInput;
                            }}
                            keyboardType="numeric"
                            className="border-circle"
                            codeLength={6}
                            containerStyle={styles.codeInputContainer}
                            codeInputStyle={styles.codeInput}
                            activeColor={BaseColor.primaryColor}
                            inactiveColor={BaseColor.textSecondaryColor}
                            onFulfill={(cc) => this.onFullFill(cc)}
                            onCodeChange={this.onCodeChange}
                        />
                    </View>
                    <View style={styles.contain}>
                        <View style={styles.contentTitle}>
                            <Text headline semibold>
                                Here you can input and confirm verification code to have & end a relationship.
                        </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ padding: 20 }}>
                    <Button
                        loading={this.state.loading}
                        full
                        onPress={() => {
                            this.setState(
                                {
                                    loading: true
                                },
                                () => {
                                    setTimeout(() => {
                                        navigation.goBack();
                                    }, 500);
                                }
                            );
                        }}
                    >
                        Confirm
                    </Button>
                </View>
            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SaveCode);