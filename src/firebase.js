import * as firebase from 'firebase/app';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAdfpHYG1u48N4PwVN24gTxMzpHPj_NP-U',
  authDomain: 'cart-266c8.firebaseapp.com',
  databaseURL: 'https://cart-266c8.firebaseio.com',
  projectId: 'cart-266c8',
  storageBucket: 'cart-266c8.appspot.com',
  messagingSenderId: '194412139681',
  appId: '1:194412139681:web:5796d088fafda4ce19cce0',
  measurementId: "G-Q5V04CD7RC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();