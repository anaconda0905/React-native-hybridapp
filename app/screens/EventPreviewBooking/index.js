import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

export default class EventPreviewBooking extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Preview Booking"
          subTitle="Booking Number GAX02"
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
          <View style={{ padding: 20 }}>
            <View style={styles.blockView}>
              <Text body1 semibold>
                Truckfighters: Performing Gravity X
              </Text>
              <Text body2 semibold style={{ marginTop: 15 }}>
                Date/Time
              </Text>
              <Text body2 grayColor style={{ marginTop: 10, marginBottom: 20 }}>
                Mon 29 Sep, 19:00 - 22:00
              </Text>
              <Text body2 semibold>
                Address
              </Text>
              <Text body2 grayColor style={{ marginVertical: 10 }}>
                0408 Collier Falls Apt. 921
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text body2>#Ticket General Admission</Text>
              </View>
              <View>
                <Text
                  body2
                  semibold
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  1 Ticket(s)
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text body2>#Ticket VIP</Text>
              </View>
              <View>
                <Text
                  body2
                  semibold
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  2 Ticket(s)
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text body2>#Ticket Reserved Seating</Text>
              </View>
              <View>
                <Text
                  body2
                  semibold
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  2 Ticket(s)
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text body2>Total Ticket</Text>
              </View>
              <View>
                <Text
                  body2
                  semibold
                  style={{
                    flex: 1,
                    alignItems: "flex-end"
                  }}
                >
                  2 Ticket(s)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.contentButtonBottom}>
          <View>
            <Text caption1 semibold grayColor>
              2 Days / 1 Night
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold grayColor style={{ marginTop: 5 }}>
              2 Adults / 1 Children
            </Text>
          </View>
          <Button
            style={{ height: 46 }}
            onPress={() =>
              navigation.navigate("CheckOut", {
                bookingType: "Event"
              })
            }
          >
            Continue
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
