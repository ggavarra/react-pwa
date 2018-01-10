import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div>
          <nav className="navbar navbar-default">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <image src="\images\flowers.jpg" name="myImg" alt="hello"></image>
                      <a className="navbar-brand" href="#">Go Seva</a>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                          <li><Link to='/'>Home</Link></li>
                          <li><Link to='/productCatalogue'>ProductCatalogue</Link></li>
                          <li><Link to='/product'>Product</Link></li>
                          <li><Link to='/supplier'>Supplier</Link></li>
                          <li><Link to='/contact'>Contact</Link></li>
                      </ul>
                  </div>
              </div>
          </nav>
      </div>
    );
  }

  componentWillMount(){
   var img = document.getElementById('myImg');
   


  }
}

export default Header;
