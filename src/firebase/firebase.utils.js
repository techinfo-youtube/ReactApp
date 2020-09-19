import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA0RSVhUOS0BVQ0FXG-82hu-h1oo8__snA",
  authDomain: "shop-db-f90ca.firebaseapp.com",
  databaseURL: "https://shop-db-f90ca.firebaseio.com",
  projectId: "shop-db-f90ca",
  storageBucket: "shop-db-f90ca.appspot.com",
  messagingSenderId: "487839428137",
  appId: "1:487839428137:web:ec3d753e2de176681f3638",
  measurementId: "G-LTD59C4LQ9",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
