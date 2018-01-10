import React ,{Component} from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import ProductGrid from './ProductGrid';
import AddProduct from './AddProduct';
import {getFirebase,snapshotToArray} from '../helpers/FirebaseHelper';
import {urlB64ToUint8Array,payloadFromSubscription} from '../helpers/Utility'
import PropTypes from 'prop-types'
import WebPush from './WebPush';
const applicationServerPublicKey = "BADRpdFs_1FjzOZvs0ib7sVKzl9lT8BGUoj3X9-TKQvj0n_ougrIkbMe-yWtbDfhjANBJoseNBRjSk3grHoZ840"

class ProductCatalogue extends Component{


    constructor(props){
    super(props);
    this.state ={
      products:[],
      subscription: {endpoint: ''},
      isUserSubscribed:false,
    };

    this.updateSubscription=this.updateSubscription.bind(this);
    this.subscribeButtonclicked=this.subscribeButtonclicked.bind(this);
    this.unSubscribeButtonclicked=this.unSubscribeButtonclicked.bind(this);
    }

    componentWillMount(){
      this.loadProducts();
    }

subscribeButtonclicked(){
 this.setState({isUserSubscribed:true});
}
unSubscribeButtonclicked(){
   this.setState({isUserSubscribed:false});
}
updateSubscription(subscription){
  console.log("onUpdateSubscriptionOnServer:", subscription)
  var payload = payloadFromSubscription(subscription)
  console.log("payload:", JSON.stringify(payload))
  this.setState({subscription: subscription})
}

loadProducts() {

  var dbGoSeva=getFirebase().database().ref().child('GoSeva');
  var dbProductsList=dbGoSeva.child('ProductCategory');

  return (
       dbProductsList.on("value",snapshot => {
        let tmpsnapshotArray = snapshotToArray(snapshot);
        console.log('description-------------------',tmpsnapshotArray[1].ProductID);
        //this.setState({products: _.values(tmpsnapshotArray)})
        // console.log('State later createRowData',this.state.products);

      })
  );
}


    render(){
      return (
        <div>
          <h3>Product Catalogue</h3>
            <div>
            <label>Do you want to subscribe for notifications?  </label>
            <button name="subscribeButton" onClick={this.subscribeButtonclicked}>Subscribe</button>
            <button name="unsubscribeButton" onClick={this.unSubscribeButtonclicked}>UnSubscribe</button>
            </div>
           <ul>Hello2 {this.state.subscription.endpoint}</ul>
           <ul><WebPush isUserSubscribed={this.state.isUserSubscribed} updateSubscription={this.updateSubscription}/></ul>
        </div>

      );

    }
}


export default ProductCatalogue;
