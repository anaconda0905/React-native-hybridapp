import * as actionTypes from "@actions/actionTypes";

const initialState = {
    login: {
        success: false
    },
    user: {
        lang: "en"
    },
    notification: {
        from: ""
    }
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                login: action.data,
            };

        case actionTypes.LANG:
            return {
                ...state,
                user: action.data,
            };

        case actionTypes.FROM:
            return {
                ...state,
                notification: action.data,
            };

        default:
            return state;
    }
};
