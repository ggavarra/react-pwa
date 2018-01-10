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
      Product: this.refs.txtProductName.value,
      ProductID:this.refs.txtProductID.value,
      Description:this.refs.txtDescription.value,
      //Supplier:this.refs.txtSupplier.value,
      Price:this.refs.txtPrice.value
    })
  }

  cancelProduct(){

  }

deleteProduct(){

  var dbref=firebase.database().ref().child('GoSeva').child('ProductCategory');
  dbref.orderByChild('Product').on("value", function(snapshot) {
      console.log(snapshot.val());
      snapshot.forEach(function(data) {
          console.log(data.key);
      });
  });

}

  componentDidMount(){

    //   var config = {
    //     apiKey: "AIzaSyDkf002b2FOilGV8TgElmTnEvuCPFVS6-0",
    //     authDomain: "react-pwa-f6908.firebaseapp.com",
    //     databaseURL: "https://react-pwa-f6908.firebaseio.com/",
    //     storageBucket: "bucket.appspot.com",
    //   };
    //
    //   if(firebase==null){
    //   firebase.initializeApp(config);
    // }


  }

  render(){
    return (

            <section>
            <div class="container-fluid">
              <h4>Add Product</h4>

              <div class="row">
                  <div class="col" ><label for="ProductName">Product Name</label></div>
                  <div class="col"><input type='text'ref="txtProductName"></input></div>
              </div>

              <div>
              <label for="ProductID">ProductID</label>
              <input type="number" ref="txtProductID"></input>
              </div>

              <div>
              <label for="Description">Description</label>
              <input type="text" ref="txtDescription"></input>
              </div>

              <div>
              <label for="Supplier">Supplier</label>
              <input type='number' ref="txtSupplier"></input>
              </div>

              <div>
              <label for="Price">Price</label>
              <input type='text' ref="txtPrice"></input>
              </div>



              <div>
                  <button onClick={this.saveProduct.bind(this)}>Save </button>
                  <button onClick={this.cancelProduct.bind(this)}>Cancel </button>
                  <button onClick={this.deleteProduct.bind(this)}>Delete </button>
              </div>

            </div>
            </section>
            );
          }
}

export default AddProduct;
