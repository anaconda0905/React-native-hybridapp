import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image, Text } from "@components";
import { Images, BaseColor } from "@config";

export default class EventCard extends Component {
  render() {
    const { style, title, location, time, image, onPress } = this.props;
    return (
      <TouchableOpacity
        style={[styles.content, style]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={image} style={styles.imageBanner} />
        <View
          style={{
            padding: 10,
            flexDirection: "row"
          }}
        >
          <View style={{ alignItems: "center", marginRight: 10 }}>
            <Text body2 primaryColor semibold>
              OCT
            </Text>
            <Text body1 grayColor semibold>
              31
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text body2 semibold numberOfLines={1} style={{ flex: 1 }}>
              {title}
            </Text>
            <Text overline grayColor style={{ marginVertical: 5 }}>
              {time}
            </Text>
            <Text overline grayColor>
              {location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

EventCard.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func
};

EventCard.defaultProps = {
  image: Images.profile2,
  title: "BBC Music Introducing",
  time: "Thu, Oct 31, 9:00am",
  location: "Tobacco Dock, London",
  style: {},
  onPress: () => {}
};
