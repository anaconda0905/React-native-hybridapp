import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Tag } from "@components";
import RangeSlider from "rn-range-slider";
import * as Utils from "@utils";
import styles from "./styles";

export default class EventFilter extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      priceBegin: 0,
      priceEnd: 1000,
      category: [
        { id: "1", selected: true, title: "All" },
        { id: "2", selected: false, title: "Music" },
        { id: "3", selected: false, title: "Sport" },
        { id: "4", selected: false, title: "Shows" },
        { id: "5", selected: false, title: "Events" },
        { id: "6", selected: false, title: "Discount" }
      ],
      scrollEnabled: true
    };
  }

  onSelectCategory(selected) {
    this.setState({
      category: this.state.category.map(item => {
        return {
          ...item,
          selected: selected.id == item.id ? !item.selected : item.selected
        };
      })
    });
  }
  render() {
    const { navigation } = this.props;
    const { priceBegin, priceEnd, scrollEnabled, category } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Filtering"
          renderLeft={() => {
            return (
              <Icon name="times" size={20} color={BaseColor.primaryColor} />
            );
          }}
          renderRight={() => {
            return (
              <Text headline primaryColor numberOfLines={1}>
                Apply
              </Text>
            );
          }}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.goBack()}
        />
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            this.setState({
              scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight)
            })
          }
        >
          <View style={{ padding: 20 }}>
            <Text headline semibold>
              PRICE
            </Text>
            <View style={styles.contentRange}>
              <Text caption1 grayColor>
                $100
              </Text>
              <Text caption1 grayColor>
                $1000
              </Text>
            </View>
            <RangeSlider
              style={{
                width: "100%",
                height: 40
              }}
              thumbRadius={12}
              lineWidth={5}
              gravity={"center"}
              labelStyle="none"
              min={100}
              max={1000}
              step={1}
              selectionColor={BaseColor.primaryColor}
              blankColor={BaseColor.textSecondaryColor}
              onValueChanged={(low, high, fromUser) => {
                this.setState({
                  priceBegin: low,
                  priceEnd: high
                });
              }}
              onTouchStart={() => {
                this.setState({
                  scrollEnabled: false
                });
              }}
              onTouchEnd={() => {
                this.setState({
                  scrollEnabled: true
                });
              }}
            />
            <View style={styles.contentResultRange}>
              <Text caption1>AVG Price</Text>
              <Text caption1>
                ${priceBegin} - ${priceEnd}
              </Text>
            </View>
            <Text headline semibold style={{ marginVertical: 20 }}>
              CATEGORY
            </Text>
            {category.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  style={styles.lineCategory}
                  onPress={() => this.onSelectCategory(item)}
                >
                  <Icon
                    name={item.selected ? "check-circle" : "circle"}
                    size={24}
                    color={BaseColor.primaryColor}
                  />
                  <Text body1 style={{ marginLeft: 10 }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
