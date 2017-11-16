const config = require('../config');
const firebase = require('firebase');

firebase.initializeApp(config.firebase);

firebase.auth().signInAnonymously().then( user => {
    console.log('USER LOGGED IN');
}).catch( err => {
    console.log('ERROR WITH FIREBASE AUTH:', err.message);
});
