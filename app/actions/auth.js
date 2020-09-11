import * as actionTypes from "./actionTypes";

const onLogin = data => {
    return {
        type: actionTypes.LOGIN,
        data
    };
};

const onChange = data => {
    return {
        type: actionTypes.LANG,
        data
    };
};

const onFrom = data => {
    return {
        type: actionTypes.FROM,
        data
    };
};

export const authentication = (login, uid, callback) => dispatch => {
    //call api and dispatch action case
    setTimeout(() => {
        let data = {
            success: login,
            uid: uid,
        };
        dispatch(onLogin(data));
        if (typeof callback === "function") {
            callback({success: true});
        }
    }, 500);
};

export const changelanguage = (payload, callback) => dispatch => {
    //call api and dispatch action case
    setTimeout(() => {
        let data = {
            lang: payload,
        };
        dispatch(onChange(data));
        if (typeof callback === "function") {
            callback({success: true});
        }
    }, 500);
};

export const fromnotification = (from, callback) => dispatch => {
    //call api and dispatch action case
    setTimeout(() => {
        
        let data = {
            from: from,
        };
        dispatch(onFrom(data));
        if (typeof callback === "function") {
            callback({success: true});
        }
    }, 500);
};