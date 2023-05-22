import React from 'react';
import ReactDOM from 'react-dom/client';

// Hojas de estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
