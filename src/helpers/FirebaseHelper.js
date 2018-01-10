import React, {Component} from "react";
import firebase from 'firebase';

export function initFireBase(){

    var config = {
      apiKey: "AIzaSyDkf002b2FOilGV8TgElmTnEvuCPFVS6-0",
      authDomain: "react-pwa-f6908.firebaseapp.com",
      databaseURL: "https://react-pwa-f6908.firebaseio.com/",
      storageBucket: "bucket.appspot.com",
    };

    //if(firebase==null){
      console.log('firbase initialized ------------------------------------');
    firebase.initializeApp(config);
  //}


}

export function getFirebase(){
  if(firebase!=null)
    return firebase;

}


export function getProducts(products,parent) {
  var dbGoSeva=firebase.database().ref().child('GoSeva');
  var dbProductsList=dbGoSeva.child('ProductCategory');

  dbProductsList.on("value",snapshot => {
    let snapshotArray = snapshotToArray(snapshot);
    parent.setState({products:snapshotArray})
    //tmpsnapshotArray=snapshotArray.slice(0);
    console.log('tmpsnapshotArrayNew',parent);
    //return tmpsnapshotArray;
  });

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    console.log('snapshotToArray :',returnArr);
    return returnArr;
};
