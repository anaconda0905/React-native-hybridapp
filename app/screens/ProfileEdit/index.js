import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TextInput, Alert, ToastAndroid } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import database from "@react-native-firebase/database";
import { FirebaseServices, NotificationServices } from '../../services'
import styles from "./styles";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: '',
      email: '',
      phoneNum: '',
      snapChat: '',
      loading: false
    };
  }

  componentDidMount(){
    FirebaseServices.getProfileByUid(this.props.auth.login.uid, (info) => {
      this.setState({
        fName: info.fName,
        lName: info.lName,
        email: info.email,
        phoneNum: info.mobileNumber,
        snapChat: info.snapChat
      });
  });
  }

  onConfirm() {
    const { fName, lName, phoneNum, snapChat } = this.state;
    const { navigation } = this.props;
    const phoneRegEx = /^[+\s.]?[0-9]{1,3}?[0-9]{3}?[-\s.]?[0-9]{2,3}[-/\s.]?[0-9]{4}$/;
    const uuid = this.props.auth.login.uid;

    if (uuid && phoneRegEx.test(phoneNum)) {
      this.setState({
        loading: true
      })
      database()
        .ref('/users/' + uuid)
        .update({
          fName: fName,
          lName: lName,
          mobileNumber: phoneNum,
          snapChat: snapChat,
        })
        .then(() => {
          this.setState({
            loading: false
          })
          ToastAndroid.show("Profile Updated successfully!", ToastAndroid.LONG);
          navigation.navigate('Home');
        });
    } else {
      ToastAndroid.show("Profile Updated successfully!", ToastAndroid.LONG);
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
          title="Edit Profile"
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
          <View style={styles.contain}>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                First Name
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ fName: text })}
              autoCorrect={false}
              placeholder="Input First Name"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.fName}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Last Name
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ lName: text })}
              autoCorrect={false}
              placeholder="Input Last Name"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.lName}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Email
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ email: text })}
              autoCorrect={false}
              placeholder="Input Name"
              editable={false}
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.email}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Mobile Number
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ phoneNum: text })}
              autoCorrect={false}
              placeholder="Input Mobile Number"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.phoneNum}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Snap Chat
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ snapChat: text })}
              autoCorrect={false}
              placeholder="Input Snap Chat"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.snapChat}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            loading={this.state.loading}
            full
            onPress={() => {
              this.onConfirm();
            }}
          >
            Confirm
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);