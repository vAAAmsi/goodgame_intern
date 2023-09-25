import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClientProvider,
  QueryClient
} from 'react-query'
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryclient = new QueryClient()
root.render(
  <React.StrictMode>
   <QueryClientProvider client={queryclient} >
     <App />
   </QueryClientProvider>
  </React.StrictMode>
);


reportWebVitals();
