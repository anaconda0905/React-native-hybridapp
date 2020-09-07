import axios from 'axios';
import { BackendConfig } from '@config';

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
    apiClient.post('https://fcm.googleapis.com/fcm/send', postData);
}

export const FirebaseServices = {
    sendNotification,
};
