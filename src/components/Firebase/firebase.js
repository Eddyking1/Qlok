import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAugl6WyIpDJslegWBJLYqBO-uROfaooG8",
  authDomain: "qlock-1a2f1.firebaseapp.com",
  databaseURL: "https://qlock-1a2f1.firebaseio.com",
  projectId: "qlock-1a2f1",
  storageBucket: "qlock-1a2f1.appspot.com",
  messagingSenderId: "832337681854"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.serverValue = app.database.ServerValue;
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // *** survey API ***

  survey = uid => this.db.ref(`surveys/${uid}`);

  surveys = () => this.db.ref("surveys");

  //*** Education API ***

  education = uid => this.db.ref(`educations/${uid}`);

  educations = () => this.db.ref("educations");

}

export default Firebase;
