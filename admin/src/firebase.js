import firebase from 'firebase';

const firebaseConfig = {

    apiKey: process.env.API_KEY,

    authDomain: "netflix-clone-81b52.firebaseapp.com",

    projectId: "netflix-clone-81b52",

    storageBucket: "netflix-clone-81b52.appspot.com",

    messagingSenderId: "744147436984",

    appId: "1:744147436984:web:5926d27998b907e89f3b4d",

    measurementId: "G-Q4V7SFF1QL"

};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;