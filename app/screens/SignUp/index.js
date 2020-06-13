import React, { Component } from "react";
import { View, ScrollView, TextInput, Switch } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import styles from "./styles";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance
} from "@components";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: false,
      first_name: "",
      last_name: "",
      mobile_number: "",
      snapchat: "",
      email: "",
      password: "",
      loading: false,
      success: {
        first_name: true,
        last_name: true,
        mobile_number: true,
        snapchat: true,
        email: true,
        password: true
      }
    };
  }

  onSignUp() {
    const { navigation } = this.props;
    let { first_name, last_name, mobile_number, snapchat, email, password, success } = this.state;

    if (first_name == "" || last_name == "" || email == "" || snapchat == "" || password == "" || mobile_number == "") {
      this.setState({
        success: {
          ...success,
          first_name: first_name != "" ? true : false,
          last_name: last_name != "" ? true : false,
          mobile_number: mobile_number != "" ? true : false,
          snapchat: snapchat != "" ? true : false,
          email: email != "" ? true : false,
          password: password != "" ? true : false
        }
      });
    } else {
      this.setState(
        {
          loading: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              loading: false
            });
            navigation.navigate("SignUp1");
          }, 500);
        }
      );
    }
  }
  /**
   * @description Call when reminder option switch on/off
   */
  toggleSwitch = value => {
    this.setState({ reminders: value });
  };
  render() {
    const { navigation } = this.props;
    let { loading, first_name, last_name, mobile_number, snapchat, email, password, success } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Sign Up"
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
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 65 }]}
              onChangeText={text => this.setState({ first_name: text })}
              autoCorrect={false}
              placeholder="First Name"
              placeholderTextColor={
                success.first_name ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={first_name}
            />
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={text => this.setState({ last_name: text })}
              autoCorrect={false}
              placeholder="Last Name"
              placeholderTextColor={
                success.last_name ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={last_name}
            />
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={text => this.setState({ mobile_number: text })}
              autoCorrect={false}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              placeholderTextColor={
                success.mobile_number ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={mobile_number}
            />
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={text => this.setState({ snapchat: text })}
              autoCorrect={false}
              placeholder="snapchat"
              placeholderTextColor={
                success.snapchat ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={snapchat}
            />
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={text => this.setState({ email: text })}
              autoCorrect={false}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={
                success.email ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={email}
            />
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={text => this.setState({ password: text })}
              autoCorrect={false}
              placeholder="password"
              placeholderTextColor={
                success.password ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={password}
            />
            <View style={styles.profileItem}>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={this.toggleSwitch}
                value={this.state.reminders}
              />
              <Text style={{color:BaseColor.grayColor}}>I agree to the Terms and Conditions</Text>
            </View>
            <View style={{ width: "100%" }}>
              <Button
                full
                style={{ marginTop: 20 }}
                loading={loading}
                onPress={() => this.onSignUp()}
              >
                Save & Login
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
