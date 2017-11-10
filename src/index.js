import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom'
import Product from './components/Product';
import Supplier from './components/Supplier';



//ReactDOM.render(<Main />, document.getElementById('root'));
ReactDOM.render(

      <BrowserRouter>
          <App />
      </BrowserRouter>,
      document.getElementById('root')
  )
