import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom'
import Product from './components/Product';
import Supplier from './components/Supplier';


//ReactDOM.render(<Main />, document.getElementById('root'));
ReactDOM.render(
      <div>

      <BrowserRouter>
          <App />
      </BrowserRouter>
      </div>
      ,
      document.getElementById('root')
  )
