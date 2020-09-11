import axios from 'axios';
import { BackendConfig } from '@config';
import database from '@react-native-firebase/database';

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

async function getNotificationByPhone(phone, callback) {

    database()
        .ref('notification')
        .orderByChild('to')
        .equalTo(phone)
        .on('value', (snapshot) => {
            const teams = snapshot.val();
            var myItems = [];
            if (teams) {
                Object.keys(teams).forEach((key) => {
                    myItems.push(teams[key]);
                });
                callback(myItems);
            }
            else {
                callback(null);
            }
        });
}

async function getProfileByUid(uid, callback) {
    database()
        .ref('/users/' + uid)
        .on('value', (snapshot) => {
            const userInfo = snapshot.val();
            callback(userInfo);
        });
}

async function getTokenByPhone(phone, callback) {
    database()
        .ref('users')
        .orderByChild('mobileNumber')
        .equalTo(phone)
        .on('value', (snapshot) => {
            const teams = snapshot.val();

            if (teams) {
                Object.keys(teams).forEach((key) => {
                    callback([teams[key].token]);
                });
            }
            else {
                callback(null);
            }
        });
}

async function saveCodebyPhone(from, to, name_title, name, description, date, code) {
    database()
        .ref('/notification/' + from + '_' + to)
        .set({
            from: from,
            to: to,
            name: name,
            title: name_title,
            description: description,
            date: date,
            code: code,
        })
        .then(() => console.log('Data set to notification table.'));
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
    saveCodebyPhone,
    getNotificationByPhone,
};
