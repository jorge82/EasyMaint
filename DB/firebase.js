import * as firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBIHfLqlJ444GEFCzzzL2LPjVssD1E6FDg",
    authDomain: "easytask-e97b3.firebaseapp.com",
    databaseURL: "https://easytask-e97b3.firebaseio.com",
    projectId: "easytask",
    storageBucket: "easytask.appspot.com",
    messagingSenderId: "278089343636",
    appId: "1:278089343636:web:e3bf068f35ab429f210a81",
    measurementId: "G-1VJFY507TZ"
};
let storage
if (typeof window !== 'undefined' && !firebase.apps.length) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);

    firebaseApp.firestore().enablePersistence()
    storage = firebase.storage()

 
}


//export default firebase
export  {
    storage, firebase as default
  }