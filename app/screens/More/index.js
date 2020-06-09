import React, { Component } from "react";
import { FlatList, RefreshControl, View, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text } from "@components";
import styles from "./styles";

export default class More extends Component {
  constructor(props) {
    super(props);

    // Define list more screens
    this.state = {
      refreshing: false,
      screen: [
        {
          screen: "ProfileExample",
          icon: "users",
          title: "8 User Profiles"
        },
        {
          screen: "AboutUs",
          icon: "home",
          title: "About Us"
        },
        {
          screen: "ContactUs",
          icon: "phone-square",
          title: "ContactUs"
        },
        {
          screen: "OurService",
          icon: "cubes",
          title: "Our Service"
        },
        {
          screen: "PricingTable",
          icon: "dollar-sign",
          title: "Pricing Table"
        },
        {
          screen: "Review",
          icon: "comments",
          title: "User Reviews"
        },
        {
          screen: "Notification",
          icon: "paper-plane",
          title: "Notification List"
        },
        {
          screen: "Messages",
          icon: "comment",
          title: "Messenger"
        },
        {
          screen: "Coupons",
          icon: "barcode",
          title: "Coupons"
        }
      ]
    };
  }

  render() {
    const { navigation } = this.props;
    let { screen } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="More"
          subTitle="Profile 8 Screens and More"
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
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 20
          }}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={this.state.refreshing}
              onRefresh={() => {}}
            />
          }
          data={screen}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name={item.icon}
                  color={BaseColor.primaryColor}
                  size={18}
                  solid
                  style={{ marginRight: 10 }}
                />
                <Text body1>{item.title}</Text>
              </View>
              <Icon
                name="angle-right"
                size={18}
                color={BaseColor.primaryColor}
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}
