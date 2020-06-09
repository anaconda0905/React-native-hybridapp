import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView
} from "react-native";
import {
  BaseStyle,
  BaseColor,
  BlueColor,
  PinkColor,
  GreenColor,
  Images
} from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  EventCard,
  EventItem
} from "@components";
import { EventListData } from "@data";
import styles from "./styles";

export default class DashboardEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
      recommend: EventListData,
      services: [
        {
          id: "1",
          color: BaseColor.lightPrimaryColor,
          icon: "compass",
          name: "All"
        },
        {
          id: "2",
          color: BaseColor.kashmir,
          icon: "music",
          name: "Music"
        },
        {
          id: "3",
          color: BlueColor.primaryColor,
          icon: "futbol",
          name: "Sports"
        },
        {
          id: "4",
          color: PinkColor.primaryColor,
          icon: "star",
          name: "Shows"
        },
        {
          id: "5",
          color: GreenColor.primaryColor,
          icon: "bullseye",
          name: "Discounts"
        }
      ],
      relate: [
        {
          id: "0",
          image: Images.event4,
          title: "BBC Music Introducing",
          time: "Thu, Oct 31, 9:00am",
          location: "Tobacco Dock, London"
        },
        {
          id: "1",
          image: Images.event5,
          title: "Bearded Theory Spring Gathering",
          time: "Thu, Oct 31, 9:00am",
          location: "Tobacco Dock, London"
        }
      ]
    };
  }

  onSearch(keyword) {}

  render() {
    const { navigation } = this.props;
    const { search, services, loading, relate, recommend } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Search"
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
            if (loading) {
              return (
                <ActivityIndicator
                  size="small"
                  color={BaseColor.primaryColor}
                />
              );
            }
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <TextInput
                style={BaseStyle.textInput}
                onChangeText={text => this.setState({ search: text })}
                autoCorrect={false}
                placeholder="Search..."
                placeholderTextColor={BaseColor.grayColor}
                value={search}
                selectionColor={BaseColor.primaryColor}
                onSubmitEditing={() => {
                  this.onSearch(search);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    search: ""
                  });
                }}
                style={styles.btnClearSearch}
              >
                <Icon name="times" size={18} color={BaseColor.grayColor} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={services}
            horizontal={true}
            keyExtractor={(item, index) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => {
                    navigation.navigate("Event");
                  }}
                >
                  <View
                    style={[
                      styles.serviceCircleIcon,
                      { backgroundColor: item.color }
                    ]}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      color={BaseColor.whiteColor}
                      solid
                    />
                  </View>
                  <Text
                    footnote
                    style={{
                      marginTop: 5
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text title3 semibold style={{ padding: 20 }}>
            Up Comming Events
          </Text>
          <View>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20
              }}
              horizontal={true}
              data={relate}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <EventCard
                  image={item.image}
                  title={item.title}
                  time={item.time}
                  location={item.location}
                  onPress={() => navigation.navigate("EventDetail")}
                  style={{ marginLeft: 20 }}
                />
              )}
            />
          </View>
          <Text title3 semibold style={{ padding: 20 }}>
            Recommend For You
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingRight: 20
            }}
            horizontal={true}
            data={recommend}
            showsHorizontalScrollIndicator={false}
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
                style={{ marginLeft: 15, width: 200 }}
                onPress={() => navigation.navigate("EventDetail")}
                onPressTag={() => navigation.navigate("Review")}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
