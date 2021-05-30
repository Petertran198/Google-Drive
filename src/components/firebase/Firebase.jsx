//Remember to npm install firebase
import firebase from 'firebase/app';
//Also pull in these two services for db and auth services
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: 'AIzaSyCEe-wdtLKsAfbE1TtRUIdX9X933hyVFLY',
    authDomain: 'fir-ex-test-e62ff.firebaseapp.com',
    projectId: 'fir-ex-test-e62ff',
    storageBucket: 'fir-ex-test-e62ff.appspot.com',
    messagingSenderId: '1048369950441',
    appId: '1:1048369950441:web:3b4b1e56c56180731f8a78',
};

firebase.initializeApp(firebaseConfig);

//Brings in the auth module
export const auth = firebase.auth();
export const getCredential = (email, password) => {
    //To get crediental u got to get it from the firebase module not the auth module
    return firebase.auth.EmailAuthProvider.credential(email, password);
};

//For optimization purposes u dont want to export the whole firestore since its a big lib so u gonna export only what is needed
// example collection row name folder
const firestore = firebase.firestore();
export const database = {
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp, // firestore builtin method to get timestamp
};
