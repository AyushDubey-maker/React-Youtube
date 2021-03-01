import firebase from "firebase"
const firebaseApp=firebase.initializeApp( {
    apiKey: "AIzaSyDd1_ifqdwdLkdg6__R8P7f2_9Idfgfx1g",
    authDomain: "react-36775.firebaseapp.com",
    projectId: "react-36775",
    storageBucket: "react-36775.appspot.com",
    messagingSenderId: "345436409359",
    appId: "1:345436409359:web:de0f94633d9c28c40a5d7a"
  });
  const auth=firebaseApp.auth();
  const storage=firebase.storage();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {auth,storage,provider}