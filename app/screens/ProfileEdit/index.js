import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, Alert, ToastAndroid } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import database from "@react-native-firebase/database";
import { TextInput } from 'react-native-paper';
import { FirebaseServices, NotificationServices } from '../../services'
import * as Utils from "@utils";
import { LangData } from "@data";
import styles from "./styles";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: LangData.en,
      fName: "",
      lName: '',
      email: '',
      phoneNum: '',
      snapChat: '',
      loading: false
    };
  }

  componentDidMount() {
    FirebaseServices.getProfileByUid(this.props.auth.login.uid, (info) => {
      this.setState({
        fName: info.fName,
        lName: info.lName,
        email: info.email,
        phoneNum: info.mobileNumber,
        snapChat: info.snapChat
      });
    });
    if (this.props.auth.user.lang == "Arabic") {
      this.setState({
        lang: LangData.arabic
      });
    }
    else {
      this.setState({
        lang: LangData.en
      });
    }
    this.props.auth.user.lang
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.lang == "Arabic") {
      this.setState({
        lang: LangData.arabic
      });
    }
    else {
      this.setState({
        lang: LangData.en
      });
    }
  }

  onConfirm() {
    const { fName, lName, phoneNum, snapChat, lang } = this.state;
    const { navigation } = this.props;
    const uuid = this.props.auth.login.uid;

    if (uuid && Utils.phoneRegEx.test(phoneNum)) {

      this.setState({
        loading: true
      });
      database()
        .ref('/users/' + uuid)
        .update({
          fName: fName,
          lName: lName,
          mobileNumber: Utils.formatPhoneNumber(phoneNum),
          snapChat: snapChat,
        })
        .then(() => {
          this.setState({
            loading: false
          })
          ToastAndroid.show(lang.profile_update_success, ToastAndroid.LONG);
          navigation.navigate('Home');
        });
    } else if (Utils.phoneRegEx.test(phoneNum) == false) {
      ToastAndroid.show(lang.input_mobile_correclty, ToastAndroid.LONG);
    } else {
      ToastAndroid.show(lang.input_correctly, ToastAndroid.LONG);
    }
  }

  render() {
    const { navigation } = this.props;
    const { lang } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title={lang.editprofile}
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
                {lang.firstName}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ fName: text })}
              autoCorrect={false}
              value={this.state.fName}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {lang.lasttName}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ lName: text })}
              autoCorrect={false}
              value={this.state.lName}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {lang.email}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ email: text })}
              autoCorrect={false}
              editable={false}
              value={this.state.email}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {lang.mobileNumber}
              </Text>
            </View>
            <View style={styles.containPhone}>
              <Text style={BaseStyle.label}>{lang.areacode}</Text>
              <TextInput
                style={BaseStyle.textInputPhone}
                onChangeText={text => this.setState({ phoneNum: text })}
                autoCorrect={false}
                value={this.state.phoneNum}
                selectionColor={BaseColor.primaryColor}
              />
            </View>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {lang.snapchat}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ snapChat: text })}
              autoCorrect={false}
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
            {lang.confirm}
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