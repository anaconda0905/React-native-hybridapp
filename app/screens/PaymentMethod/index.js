import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text } from "@components";
import styles from "./styles";

export default class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPreviewMethod() {
    const { navigation } = this.props;
    navigation.navigate("PreviewPayment");
  }
  render() {
    const { navigation } = this.props;
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
        <View style={styles.contain}>
          <TouchableOpacity
            style={styles.methodItem}
            onPress={() => this.onPreviewMethod()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={styles.iconContent}>
                <Icon
                  name="credit-card"
                  size={24}
                  color={BaseColor.textPrimaryColor}
                />
              </View>
              <Text headline>Domestic Card</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={BaseColor.primaryColor}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.methodItem}
            onPress={() => this.onPreviewMethod()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={styles.iconContent}>
                <Icon
                  name="cc-visa"
                  size={24}
                  color={BaseColor.textPrimaryColor}
                />
              </View>
              <Text headline>Credit Card</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={BaseColor.primaryColor}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.methodItem}
            onPress={() => this.onPreviewMethod()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={styles.iconContent}>
                <Icon
                  name="globe"
                  size={24}
                  color={BaseColor.textPrimaryColor}
                />
              </View>
              <Text headline>Internet Banking</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={BaseColor.primaryColor}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.methodItem}
            onPress={() => this.onPreviewMethod()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={styles.iconContent}>
                <Icon
                  name="mobile-alt"
                  size={24}
                  color={BaseColor.textPrimaryColor}
                />
              </View>
              <Text headline>Mobile Wallets</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={BaseColor.primaryColor}
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
