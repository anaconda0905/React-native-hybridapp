import axios from 'axios';
import { BackendConfig } from '@config';
import database from '@react-native-firebase/database';
import { useCallback } from 'react';

const apiClient = axios.create({
    baseURL: BackendConfig.FCM_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'key=' + BackendConfig.FIREBASE_API_KEY,
    },
    timeout: 30000,
});

function sendNotification(body) {
    var postData = {
        notification: body.notification,
        data: body.data,
        registration_ids: body.registration_ids,
    };
    console.log(postData);
    apiClient.post('https://fcm.googleapis.com/fcm/send', postData);
}

async function getProfileByUid(uid, callback) {
    database()
        .ref('/users/' + uid)
        .once('value')
        .then(snapshot => {
            const userInfo = snapshot.val();
            callback(userInfo);
        });
}

async function getTokenByPhone(phone, callback) {
    database()
        .ref('users')
        .orderByChild('mobileNumber')
        .equalTo(phone)
        .once('value', (snapshot) => {
            const teams = snapshot.val();

            if (teams) {
                Object.keys(teams).forEach((key) => {
                    callback([teams[key].token]);
                });
            }
            else{
                callback(null);
            }
        });
}

async function updateProfileTokenByUid(uid, token) {
    database()
        .ref('/users/' + uid)
        .update({
            token: token,
        })
        .then(() => { });
}

export const FirebaseServices = {
    sendNotification,
    getProfileByUid,
    updateProfileTokenByUid,
    getTokenByPhone,
};
