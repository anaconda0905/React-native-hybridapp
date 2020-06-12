import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { bindActionCreators } from "redux";
import { SafeAreaView, Text, Button, Image, Icon } from "@components";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images } from "@config";
import * as Utils from "@utils";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Dropdown } from 'react-native-material-dropdown';

class Walkthrough extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      scrollEnabled: true,
      cca2: 'US',
      inputext: '',
      slide: [
        { key: 1, image: Images.trip2 },
        { key: 2, image: Images.trip1 },
        { key: 3, image: Images.trip3 },
        { key: 4, image: Images.trip4 }
      ]
    };
  }

  /**
   * @description Simple authentication without call any APIs
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  authentication() {
    this.setState(
      {
        loading: true
      },
      () => {
        this.props.actions.authentication(true, response => {
          if (response.success) {
            this.props.navigation.navigate("Loading");
          } else {
            this.setState({
              loading: false
            });
          }
        });
      }
    );
  }

  render() {
    const { navigation } = this.props;
    let data = [{
      value: 'Mobile number',
    }, {
      value: 'Email',
    }, {
      value: 'Snapchat',
    }];
    
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <ScrollView
          style={styles.contain}
          scrollEnabled={this.state.scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            this.setState({
              scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight)
            })
          }
        >
          <View style={styles.contentActionTop}>
              <TouchableOpacity onPress={() => this.authentication()}>
                <Text body1 primaryColor>
                  Eng/Arabic
                </Text>
              </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.userplus}>
              <Icon name="user-plus" color={BaseColor.primaryColor} size={30} solid />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            {/* Images Swiper */}
            <Swiper
              dotStyle={{
                backgroundColor: BaseColor.textSecondaryColor
              }}
              activeDotColor={BaseColor.primaryColor}
              paginationStyle={styles.contentPage}
              removeClippedSubviews={false}
            >
              {this.state.slide.map((item, index) => {
                return (
                  <View style={styles.slide} key={item.key}>
                    <Image source={item.image} style={styles.img} />
                    <Text body1 style={styles.textSlide}>
                      I am relationship status
                    </Text>
                  </View>
                );
              })}
            </Swiper>
          </View>
          <View style={{ width: "100%" }}>
            {/* <Button
              full
              style={{
                backgroundColor: BaseColor.navyBlue,
                marginTop: 20
              }}
              onPress={() => {
                this.authentication();
              }}
            >
              Login with Facebook
            </Button> */}
            <Dropdown
              label='Search By'
              data={data}
            />
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ inputext: text })}
              autoCorrect={false}
              placeholder="Result"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.country}
              selectionColor={BaseColor.primaryColor}
            />
            <Button
              full
              style={{ marginTop: 20 }}
              loading={this.state.loading}
              onPress={() => navigation.navigate("SignIn")}
            >
              Sign In
            </Button>
            {/* <View style={styles.contentActionBottom}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text body1 grayColor>
                  Haven’t registered yet?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.authentication()}>
                <Text body1 primaryColor>
                  Join Now
                </Text>
              </TouchableOpacity>
            </View> */}
            <AirbnbRating reviews={[""]} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
