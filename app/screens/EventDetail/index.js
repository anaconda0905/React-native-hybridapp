import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ProfileGroup,
  Tag,
  Image,
  Button,
  EventCard
} from "@components";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Utils from "@utils";
import styles from "./styles";

export default class EventDetail extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      heightHeader: Utils.heightHeader(),
      region: {
        latitude: 1.352083,
        longitude: 103.819839,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004
      },
      facilities: [
        { id: "1", icon: "wifi", name: "Free Wifi", checked: true },
        { id: "2", icon: "bath", name: "Shower" },
        { id: "3", icon: "paw", name: "Pet Allowed" },
        { id: "4", icon: "bus", name: "Shuttle Bus" },
        { id: "5", icon: "cart-plus", name: "Supper Market" },
        { id: "6", icon: "clock", name: "Open 24/7" }
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
    this._deltaY = new Animated.Value(0);
  }

  render() {
    const { navigation } = this.props;
    const { heightHeader, region, facilities, relate } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(250, 1);
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.View
          style={[
            styles.imgBanner,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(140),
                  Utils.scaleWithPixel(140)
                ],
                outputRange: [heightImageBanner, heightHeader, heightHeader]
              })
            }
          ]}
        >
          <Image source={Images.event1} style={{ flex: 1 }} />
          <Animated.View
            style={{
              position: "absolute",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingHorizontal: 20,
              width: "100%",
              bottom: 15,
              opacity: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(140),
                  Utils.scaleWithPixel(140)
                ],
                outputRange: [1, 0, 0]
              })
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Image source={Images.profile2} style={styles.userIcon} />
              <View>
                <Text headline semibold whiteColor>
                  Steve Garrett
                </Text>
                <Text footnote whiteColor>
                  5 hours ago | 100k views
                </Text>
              </View>
            </View>
            <Tag rateSmall>Sold Out</Tag>
          </Animated.View>
        </Animated.View>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          {/* Header */}
          <Header
            title=""
            renderLeft={() => {
              return (
                <Icon
                  name="arrow-left"
                  size={20}
                  color={BaseColor.whiteColor}
                />
              );
            }}
            renderRight={() => {
              return (
                <Icon name="images" size={20} color={BaseColor.whiteColor} />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={() => {
              navigation.navigate("PreviewImage");
            }}
          />
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY }
                }
              }
            ])}
            onContentSizeChange={() => {
              this.setState({
                heightHeader: Utils.heightHeader()
              });
            }}
            scrollEventThrottle={8}
          >
            <View style={{ height: 255 - heightHeader }} />
            <View
              style={{
                paddingHorizontal: 20,
                marginBottom: 20
              }}
            >
              <Text title1 semibold style={{ marginBottom: 10 }}>
                Truckfighters: Performing Gravity X
              </Text>
              <ProfileGroup
                name="Steve, Lincoln, Harry"
                detail="and 15 people like this"
                users={[
                  { image: Images.profile1 },
                  { image: Images.profile3 },
                  { image: Images.profile4 }
                ]}
              />
              <Text body2 semibold style={{ marginTop: 10 }}>
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
              <View
                style={{
                  height: 180
                }}
              >
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  region={region}
                  onRegionChange={() => {}}
                >
                  <Marker
                    coordinate={{
                      latitude: 1.352083,
                      longitude: 103.819839
                    }}
                  />
                </MapView>
              </View>
              <Text body2 semibold style={{ marginTop: 20, marginBottom: 10 }}>
                Description
              </Text>
              <Text body2 grayColor lineHeight={20}>
                Desertscene, in association with X-Ray Touring, proudly
                presents: The return of TRUCKFIGHETERS Playing 'Gravity X' from
                finish to start. Plus special guests Swan Valley Heights
              </Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text caption1 accentColor>
                  See Details
                </Text>
              </View>
              <Text title3 semibold style={{ marginTop: 10, marginBottom: 5 }}>
                Pricing
              </Text>
              <View style={styles.itemPrice}>
                <Text headline semibold>
                  #Ticket General Admission
                </Text>
                <Text body2 grayColor style={{ marginVertical: 5 }}>
                  Provide a baseline experience for attendees. They also help
                  you convert people who don’t want
                </Text>
                <View style={styles.linePrice}>
                  <Text title3 primaryColor semibold>
                    $399,99
                  </Text>
                  <View style={styles.iconRight}>
                    <TouchableOpacity>
                      <Icon
                        name="minus-circle"
                        size={24}
                        color={BaseColor.grayColor}
                      />
                    </TouchableOpacity>
                    <Text title1 style={{ paddingHorizontal: 10 }}>
                      1
                    </Text>
                    <TouchableOpacity>
                      <Icon
                        name="plus-circle"
                        size={24}
                        color={BaseColor.primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.itemPrice}>
                <Text headline semibold>
                  #Ticket VIP
                </Text>
                <Text body2 grayColor style={{ marginVertical: 5 }}>
                  Offer attendees the exact experience they’re looking for, at
                  the exact price they’re willing to pay.
                </Text>
                <View style={styles.linePrice}>
                  <Text title3 primaryColor semibold>
                    $299,99
                  </Text>
                  <View style={styles.iconRight}>
                    <TouchableOpacity>
                      <Icon
                        name="minus-circle"
                        size={24}
                        color={BaseColor.grayColor}
                      />
                    </TouchableOpacity>
                    <Text title1 style={{ paddingHorizontal: 10 }}>
                      1
                    </Text>
                    <TouchableOpacity>
                      <Icon
                        name="plus-circle"
                        size={24}
                        color={BaseColor.primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.itemPrice}>
                <Text headline semibold>
                  #Ticket Reserved Seating
                </Text>
                <Text body2 grayColor style={{ marginVertical: 5 }}>
                  Provide big value for attendees wanting to be closer to a
                  performer or speaker at your event.
                </Text>
                <View style={styles.linePrice}>
                  <Text title3 primaryColor semibold>
                    $199,99
                  </Text>
                  <View style={styles.iconRight}>
                    <TouchableOpacity>
                      <Icon
                        name="minus-circle"
                        size={24}
                        color={BaseColor.grayColor}
                      />
                    </TouchableOpacity>
                    <Text title1 style={{ paddingHorizontal: 10 }}>
                      1
                    </Text>
                    <TouchableOpacity>
                      <Icon
                        name="plus-circle"
                        size={24}
                        color={BaseColor.primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text
                title3
                semibold
                style={{
                  paddingTop: 10
                }}
              >
                Facilities
              </Text>
              <View style={styles.wrapContent}>
                {facilities.map(item => {
                  return (
                    <Tag
                      icon={
                        <Icon
                          name={item.icon}
                          size={12}
                          color={BaseColor.accentColor}
                          solid
                          style={{ marginRight: 5 }}
                        />
                      }
                      chip
                      key={item.id}
                      style={{
                        marginTop: 10,
                        marginRight: 10
                      }}
                    >
                      {item.name}
                    </Tag>
                  );
                })}
              </View>
            </View>
            <Text
              title3
              semibold
              style={{
                marginLeft: 20,
                marginBottom: 20
              }}
            >
              You May Also Like
            </Text>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20
              }}
              horizontal={true}
              data={relate}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <EventCard
                  image={item.image}
                  title={item.title}
                  time={item.time}
                  location={item.location}
                  onPress={() => navigation.navigate("PreviewBooking")}
                  style={{ marginLeft: 20, marginBottom: 20 }}
                />
              )}
            />
          </ScrollView>
          {/* Pricing & Booking Process */}
          <View style={styles.contentButtonBottom}>
            <View>
              <Text caption1 semibold grayColor>
                AVG Price
              </Text>
              <Text title3 primaryColor semibold>
                $399.99
              </Text>
              <Text caption1 semibold grayColor style={{ marginTop: 5 }}>
                Person/Ticket
              </Text>
            </View>
            <Button
              style={{ height: 46 }}
              onPress={() => navigation.navigate("EventPreviewBooking")}
            >
              Book Now
            </Button>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
