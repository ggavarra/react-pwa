import React ,{Component} from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import ProductGrid from './ProductGrid';
import AddProduct from './AddProduct';
class Product extends Component{


  constructor(props){
  super(props);
  this.addProduct=this.addProduct.bind(this);
  this.state ={
    addButtonClicked:false
  };
  }

  addProduct(){
    console.log("Product going to be added");
    this.setState({addButtonClicked:true});

  }


  editProducts(){
    console.log("Product going to be edited");
  }

  render(){
    const isAddProduct=this.state.addButtonClicked;
    console.log('addButtonClicked-->'+this.state.addButtonClicked);
    let addProduct=null;
    if (isAddProduct) {
      addProduct=<AddProduct/>;
    }
    return (<div>
            <h2> Products  </h2>
            <ProductGrid/>
            <p>
            <button onClick={this.addProduct}>Add Product </button>
            <button onClick={this.editProducts}>Edit Products </button>
            </p>
            {addProduct}
            <p>


            </p>
            </div>

            );
          }

  }

export default Product;
