import React, { Component } from "react";
import { View, TextInput, Switch } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

export default class PreviewPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: "",
      valid: "",
      digit: "",
      name: "",
      loading: false,
      primary: true,
      success: {
        card: true,
        valid: true,
        digit: true,
        name: true
      }
    };
  }

  /**
   * @description Call when reminder option switch on/off
   */
  toggleSwitch = value => {
    this.setState({ primary: value });
  };

  onPayNow() {
    const { navigation } = this.props;
    this.setState(
      {
        loading: true
      },
      () => {
        setTimeout(() => {
          navigation.navigate("BookingDetail");
        }, 1000);
      }
    );
  }

  render() {
    const { navigation } = this.props;
    const { success, card, valid, digit, name, primary, loading } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Payment Method"
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
        <View style={{ flex: 1, padding: 20 }}>
          <Text headline semibold>
            Credit Card Details
          </Text>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={text => this.setState({ card: text })}
            autoCorrect={false}
            placeholder="Credit Card Number"
            placeholderTextColor={
              success.card ? BaseColor.grayColor : BaseColor.primaryColor
            }
            keyboardType="numeric"
            value={card}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 6.5 }}>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={text => this.setState({ valid: text })}
                autoCorrect={false}
                placeholder="Valid Until"
                placeholderTextColor={
                  success.valid ? BaseColor.grayColor : BaseColor.primaryColor
                }
                value={valid}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={{ flex: 3.5, marginLeft: 10 }}>
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={text => this.setState({ digit: text })}
                autoCorrect={false}
                placeholder="3-Digit CCV"
                placeholderTextColor={
                  success.digit ? BaseColor.grayColor : BaseColor.primaryColor
                }
                keyboardType="numeric"
                value={digit}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
          </View>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={text => this.setState({ name: text })}
            autoCorrect={false}
            placeholder="Name on card"
            placeholderTextColor={
              success.name ? BaseColor.grayColor : BaseColor.primaryColor
            }
            value={name}
            selectionColor={BaseColor.primaryColor}
          />
          <View style={styles.checkDefault}>
            <Text body2>Set as primary</Text>
            <Switch
              name="angle-right"
              size={18}
              onValueChange={this.toggleSwitch}
              value={primary}
            />
          </View>
        </View>
        <View style={{ margin: 20 }}>
          <Button loading={loading} full onPress={() => this.onPayNow()}>
            Pay Now
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
