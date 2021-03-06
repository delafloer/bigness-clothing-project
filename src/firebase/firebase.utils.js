import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDMoEXQyZnFrSzo6bQM6AtdhafPODlxz40",
    authDomain: "bigness-db.firebaseapp.com",
    databaseURL: "https://bigness-db.firebaseio.com",
    projectId: "bigness-db",
    storageBucket: "bigness-db.appspot.com",
    messagingSenderId: "460668193963",
    appId: "1:460668193963:web:10ea5c1cf975877a227bee",
    measurementId: "G-SKDJ6CFESH"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShop = await userRef.get();

  if (!snapShop.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}  

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
