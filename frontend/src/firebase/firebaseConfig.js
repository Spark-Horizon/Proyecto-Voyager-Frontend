import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const app = firebase.initializeApp(
{
    apiKey: process.env.REACT_APP_FBAPIKEY,
    authDomain: process.env.REACT_APP_FBAUTHDOMAIN,
    projectId: process.env.REACT_APP_FBPROJECTID,
    storageBucket: process.env.REACT_APP_FBSTORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FBMESSAGINGSENDERID,
    appId: process.env.REACT_APP_FBAPPID,
    measurementId: process.env.REACT_APP_FBMEASUREMENTID
});

export const auth = app.auth();