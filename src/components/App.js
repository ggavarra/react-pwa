import React, { Component } from 'react';
//import './App.css';
import Header from './Header';
import Main from './Main';
import firebase from 'firebase';
import {initFireBase} from '../helpers/FirebaseHelper';
class App extends Component {

  componentWillMount(){
    initFireBase();
  }

  render() {

    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
