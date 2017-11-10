import React ,{Component} from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';

class AddProduct extends Component{

  constructor(props){
  super(props);
  this.saveProduct=this.saveProduct.bind(this);
  }

  saveProduct(){
    console.log('Inside save Product');
    var dbref=firebase.database().ref().child('GoSeva').child('ProductCategory');
    dbref.push().set({
      Product:'A1 Ghee',
      ProductID:5
    })
  }

  componentDidMount(){

      var config = {
        apiKey: "AIzaSyDkf002b2FOilGV8TgElmTnEvuCPFVS6-0",
        authDomain: "react-pwa-f6908.firebaseapp.com",
        databaseURL: "https://react-pwa-f6908.firebaseio.com/",
        storageBucket: "bucket.appspot.com",
      };

      if(firebase==null){
      firebase.initializeApp(config);
    }


  }

  render(){
    return (
          <div>
            <h4>Add Product</h4>
              <div>
              <label for="Name">Name</label>
              <input type='text'></input>
              </div>
              <div>
              <label for="Description">Description</label>
              <input type='text'></input>
              </div>

              <div>
              <label for="Supplier">Supplier</label>
              <input type='number'></input>
              </div>

              <div>
              <label for="Price">Price</label>
              <input type='text'></input>
              </div>


            <button onClick={this.saveProduct}>Save</button>
            <button onClick={this.cancelProduct}>Cancel </button>

            </div>
            );
          }
}

export default AddProduct;
