import React from 'react';
import ReactDOM from 'react-dom';
import {SubmitProcessor} from "./SubmitProcessor";
import './index.css';
import {ProductForm} from "./components/ProductForm";

ReactDOM.render(
  <React.StrictMode>
      <ProductForm handleSubmit={SubmitProcessor}/>
  </React.StrictMode>,
  document.getElementById('root')
);

