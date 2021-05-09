//Remember to npm install firebase
import firebase from 'firebase/app';
//Also pull in these two services for db and auth services
import 'firebase/auth';

var firebaseConfig = {
    apiKey: 'AIzaSyCEe-wdtLKsAfbE1TtRUIdX9X933hyVFLY',
    authDomain: 'fir-ex-test-e62ff.firebaseapp.com',
    projectId: 'fir-ex-test-e62ff',
    storageBucket: 'fir-ex-test-e62ff.appspot.com',
    messagingSenderId: '1048369950441',
    appId: '1:1048369950441:web:3b4b1e56c56180731f8a78',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
