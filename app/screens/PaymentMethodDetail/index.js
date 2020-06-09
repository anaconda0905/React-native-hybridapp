import React, { Component } from "react";
import { View, Switch } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

export default class PaymentMethodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: "",
      valid: "",
      digit: "",
      name: "",
      loading: false,
      primary: true
    };
  }

  /**
   * @description Call when reminder option switch on/off
   */
  toggleSwitch = value => {
    this.setState({ primary: value });
  };

  onDeletePayment() {
    const { navigation } = this.props;
    this.setState(
      {
        loading: true
      },
      () => {
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    );
  }

  render() {
    const { navigation } = this.props;
    const { card, valid, digit, name, primary, loading } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Card Detail"
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
          <View style={styles.card}>
            <Icon name="cc-visa" size={48} color={BaseColor.textPrimaryColor} />
            <Text body1 style={{ marginTop: 10 }}>
              **** **** **** 1989
            </Text>
            <Text footnote grayColor style={{ marginTop: 4 }}>
              Expiries 02/2020
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text footnote primaryColor style={{ marginTop: 15 }}>
                Primary
              </Text>
            </View>
          </View>
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
          <Button
            loading={loading}
            outline
            onPress={() => this.onDeletePayment()}
          >
            Delete
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
