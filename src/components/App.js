import React, { Component } from 'react';
//import './App.css';
import Header from './Header';
import Main from './Main';
import firebase from 'firebase';

class App extends Component {

  render() {

    // Set the configuration for your app
    // TODO: Replace with your project's config object
    // var config = {
    //   apiKey: "AIzaSyDkf002b2FOilGV8TgElmTnEvuCPFVS6-0",
    //   authDomain: "react-pwa-f6908.firebaseapp.com",
    //   databaseURL: "https://react-pwa-f6908.firebaseio.com/",
    //   storageBucket: "bucket.appspot.com"
    // };
    // firebase.initializeApp(config);
    

    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
