import React, { Component } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  Animated,
  Platform
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, EventItem, FilterSort } from "@components";
import styles from "./styles";
import * as Utils from "@utils";

// Load sample data
import { EventListData } from "@data";

export default class Event extends Component {
  constructor(props) {
    super(props);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      refreshing: false,
      modeView: "block",
      list: EventListData,
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp"
          }),
          offsetAnim
        ),
        0,
        40
      )
    };
    this.onChangeView = this.onChangeView.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
  }

  onChangeSort() {}

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  onFilter() {
    const { navigation } = this.props;
    navigation.navigate("EventFilter");
  }

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  onChangeView() {
    let { modeView } = this.state;
    Utils.enableExperimental();
    switch (modeView) {
      case "block":
        this.setState({
          modeView: "grid"
        });
        break;
      case "grid":
        this.setState({
          modeView: "list"
        });
        break;
      case "list":
        this.setState({
          modeView: "block"
        });
        break;
      default:
        this.setState({
          modeView: "block"
        });
        break;
    }
  }

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  renderList() {
    const { modeView, list, refreshing, clampedScroll } = this.state;
    const { navigation } = this.props;
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: "clamp"
    });
    switch (modeView) {
      case "block":
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingBottom: 20
              }}
              refreshControl={
                <RefreshControl
                  colors={[BaseColor.primaryColor]}
                  tintColor={BaseColor.primaryColor}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.state.scrollAnim
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              showsVerticalScrollIndicator={false}
              data={list}
              key={"block"}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <EventItem
                  block
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  tracking={item.tracking}
                  rate={item.rate}
                  status={item.status}
                  price={item.price}
                  priceSale={item.priceSale}
                  eventType={item.eventType}
                  time={item.time}
                  user={item.user}
                  numTicket={item.numTicket}
                  liked={item.liked}
                  onPress={() => navigation.navigate("EventDetail")}
                  onPressTag={() => navigation.navigate("Review")}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] }
              ]}
            >
              <FilterSort
                modeView={modeView}
                onChangeSort={this.onChangeSort}
                onChangeView={this.onChangeView}
                onFilter={this.onFilter}
              />
            </Animated.View>
          </View>
        );
      case "grid":
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingBottom: 20
              }}
              columnWrapperStyle={{
                marginHorizontal: 20
              }}
              refreshControl={
                <RefreshControl
                  colors={[BaseColor.primaryColor]}
                  tintColor={BaseColor.primaryColor}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.state.scrollAnim
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={list}
              key={"gird"}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <EventItem
                  grid
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  tracking={item.tracking}
                  rate={item.rate}
                  status={item.status}
                  price={item.price}
                  priceSale={item.priceSale}
                  eventType={item.eventType}
                  time={item.time}
                  user={item.user}
                  numTicket={item.numTicket}
                  liked={item.liked}
                  style={
                    index % 2 == 0
                      ? {
                          marginBottom: 20
                        }
                      : {
                          marginLeft: 15,
                          marginBottom: 20
                        }
                  }
                  onPress={() => navigation.navigate("EventDetail")}
                  onPressTag={() => navigation.navigate("Review")}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }]
                }
              ]}
            >
              <FilterSort
                modeView={modeView}
                onChangeSort={this.onChangeSort}
                onChangeView={this.onChangeView}
                onFilter={this.onFilter}
              />
            </Animated.View>
          </View>
        );

      case "list":
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: BaseColor.fieldColor,
              paddingHorizontal: 20
            }}
          >
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                marginTop: 10
              }}
              refreshControl={
                <RefreshControl
                  colors={[BaseColor.primaryColor]}
                  tintColor={BaseColor.primaryColor}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.state.scrollAnim
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              showsVerticalScrollIndicator={false}
              data={list}
              key={"list"}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <EventItem
                  list
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  tracking={item.tracking}
                  rate={item.rate}
                  status={item.status}
                  price={item.price}
                  priceSale={item.priceSale}
                  eventType={item.eventType}
                  time={item.time}
                  user={item.user}
                  numTicket={item.numTicket}
                  liked={item.liked}
                  style={{
                    marginBottom: 20
                  }}
                  onPress={() => navigation.navigate("EventDetail")}
                  onPressTag={() => navigation.navigate("Review")}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }]
                }
              ]}
            >
              <FilterSort
                modeView={modeView}
                onChangeSort={this.onChangeSort}
                onChangeView={this.onChangeView}
                onFilter={this.onFilter}
              />
            </Animated.View>
          </View>
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingBottom: 20
              }}
              refreshControl={
                <RefreshControl
                  colors={[BaseColor.primaryColor]}
                  tintColor={BaseColor.primaryColor}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.state.scrollAnim
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              showsVerticalScrollIndicator={false}
              data={list}
              key={"block"}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <EventItem
                  block
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  tracking={item.tracking}
                  rate={item.rate}
                  status={item.status}
                  price={item.price}
                  priceSale={item.priceSale}
                  eventType={item.eventType}
                  time={item.time}
                  user={item.user}
                  numTicket={item.numTicket}
                  liked={item.liked}
                  style={{
                    borderBottomWidth: 0.5,
                    borderColor: BaseColor.textSecondaryColor,
                    marginBottom: 10
                  }}
                  onPress={() => navigation.navigate("EventDetail")}
                  onPressTag={() => navigation.navigate("Review")}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] }
              ]}
            >
              <FilterSort
                modeView={modeView}
                onChangeSort={this.onChangeSort}
                onChangeView={this.onChangeView}
                onFilter={this.onFilter}
              />
            </Animated.View>
          </View>
        );
        break;
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Event"
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="search" size={24} color={BaseColor.primaryColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate("SearchHistory");
          }}
        />
        {this.renderList()}
      </SafeAreaView>
    );
  }
}
