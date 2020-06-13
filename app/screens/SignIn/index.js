import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, TextInput, CameraRoll, ToastAndroid } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Button, Image } from "@components";
import styles from "./styles";

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
      }
    };
  }

  onLogin() {
    const { id, password, success } = this.state;
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
          this.props.actions.authentication(true, response => {
            if (response.success && id == "test" && password == "123456") {
              navigation.navigate("Loading");
            } else {
              this.setState({
                loading: false
              });
            }
          });
        }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Relationship Status"
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
          {/* <Image source={Images.logo} style={styles.logo} resizeMode="contain" /> */}
          <View style={styles.contain}>
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 65 }]}
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
              placeholder="Relationship status"
              placeholderTextColor={
                this.state.success.id
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.id}
              selectionColor={BaseColor.primaryColor}
            />
            {/* <QRCode
              value="Just some string value"
              logo={{ uri: base64Logo }}
              logoSize={30}
              logoBackgroundColor='transparent'
            /> */}
            {/* <TextInput
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
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={
                this.state.success.password
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.password}
              selectionColor={BaseColor.primaryColor}
            /> */}
            <View style={{ width: "100%" }}>
              <Button
                full
                loading={this.state.loading}
                style={{ marginTop: 20 }}
                onPress={() => {
                  this.onLogin();
                }}
              >
                Cancel & send notification
              </Button>
            </View>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text body1 grayColor style={{ marginTop: 25 }}>
                Forgot your password?
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </SafeAreaView>
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
