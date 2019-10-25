import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCOdHkA2Tk3owXtxVuXyzZJnQDxpkSP-m8",
    authDomain: "crwn-db-d1b68.firebaseapp.com",
    databaseURL: "https://crwn-db-d1b68.firebaseio.com",
    projectId: "crwn-db-d1b68",
    storageBucket: "crwn-db-d1b68.appspot.com",
    messagingSenderId: "58857772422",
    appId: "1:58857772422:web:0c0b2a9dead9920de4c807",
    measurementId: "G-5HNXESFVWL"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
        console.log('error creating user'.error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

  
