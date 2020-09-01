import React, { Component } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      name: 'jin long',
      email: 'conda95@outlook.com',
      address: 'd',
      loading: false
    };
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
          onPressRight={() => {}}
        />
        <ScrollView>
          <View style={styles.contain}>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Account
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ id: text })}
              autoCorrect={false}
              placeholder="Input ID"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.id}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Name
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ name: text })}
              autoCorrect={false}
              placeholder="Input Name"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.name}
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
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.email}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Address
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={text => this.setState({ address: text })}
              autoCorrect={false}
              placeholder="Input Address"
              placeholderTextColor={BaseColor.grayColor}
              value={this.state.address}
              selectionColor={BaseColor.primaryColor}
            />
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            loading={this.state.loading}
            full
            onPress={() => {
              this.setState(
                {
                  loading: true
                },
                () => {
                  setTimeout(() => {
                    navigation.goBack();
                  }, 500);
                }
              );
            }}
          >
            Confirm
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
