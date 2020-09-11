import React, { Component } from "react";
import { RefreshControl, FlatList } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle } from "@components";
import styles from "./styles";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { LangData } from "@data";
import { NotificationData } from "@data";
import { FirebaseServices } from '../../services'
import * as Utils from "@utils";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            fName: "",
            lName: '',
            email: '',
            phoneNum: '',
            snapChat: '',
            notification: [],
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
            let myphoneNum = Utils.formatPhoneNumber(info.mobileNumber);
            
            FirebaseServices.getNotificationByPhone(myphoneNum, (data) => {
                this.setState({
                    notification: data
                });
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

    render() {
        
        const { navigation } = this.props;
        let { notification } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Notification"
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
                    refreshControl={
                        <RefreshControl
                            colors={[BaseColor.primaryColor]}
                            tintColor={BaseColor.primaryColor}
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                            }}
                        />
                    }
                    data={notification}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <ListThumbCircle
                            txtLeftTitle={item.title}
                            txtUserName={item.name}
                            txtContent={item.description}
                            txtRight={item.date}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);