import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, BusPlan, Button } from "@components";
import styles from "./styles";

export default class BusTicket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Ticket"
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
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.contain}>
            <Text headline bold>
              Truckfighters: Performing Gravity X
            </Text>
            <Text caption1 light style={{ marginTop: 10 }}>
              Address
            </Text>
            <Text headline style={{ marginTop: 5 }}>
              0408 Collier Falls Apt. 921
            </Text>
            <Text caption1 light style={{ marginTop: 10 }}>
              Date/Time
            </Text>
            <Text headline style={{ marginTop: 5 }}>
              Mon 29 Sep, 19:00 - 22:00
            </Text>
            <View style={styles.line} />
            <View style={styles.code}>
              <Text headline semibold>
                At The Entrance, Show The QR Code Below
              </Text>
              <Icon
                name="qrcode"
                size={150}
                color="black"
                style={{ marginVertical: 10 }}
              />
              <Text headline semibold>
                Thanks For Your RSVP
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ margin: 20 }}>
          <Button full>Download</Button>
        </View>
      </SafeAreaView>
    );
  }
}
