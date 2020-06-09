import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

export default class MyPaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      card: [
        {
          id: 1,
          icon: "cc-visa",
          title: "**** **** **** 1989",
          subtitle: "Expiries 02/2020",
          primary: true
        },
        {
          id: 2,
          icon: "paypal",
          title: "steve.garrett@passionui.com",
          subtitle: "Added 01/2019"
        },
        {
          id: 3,
          icon: "cc-mastercard",
          title: "**** **** ****2091",
          subtitle: "Expiries 10/2021"
        },
        {
          id: 4,
          icon: "apple-pay",
          title: "steve.garrett@icloud.com",
          subtitle: "Added 01/2019"
        }
      ]
    };
  }

  onSelectMethod(item) {
    const { navigation } = this.props;
    navigation.navigate("PaymentMethodDetail");
  }

  render() {
    const { navigation } = this.props;
    const { loading, card } = this.state;

    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="My Cards"
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
          {card.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.paymentItem}
                onPress={() => this.onSelectMethod(item)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.iconContent}>
                    <Icon
                      name={item.icon}
                      size={48}
                      color={BaseColor.textPrimaryColor}
                    />
                  </View>
                  <View>
                    <Text body1>{item.title}</Text>
                    <Text footnote grayColor style={{ marginTop: 5 }}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                {item.primary ? (
                  <Text footnote primaryColor>
                    primary
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ padding: 20 }}>
          <Button
            loading={loading}
            full
            onPress={() => navigation.navigate("AddPayment")}
          >
            Add Payment Method
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
