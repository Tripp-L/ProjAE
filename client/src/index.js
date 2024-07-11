import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import FavoriteProvider from './contexts/FavoriteContext'; 
import { SearchProvider } from './contexts/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <FavoriteProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </FavoriteProvider>
    </Router>
  </React.StrictMode>
);
