import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Routes } from 'routes';
import { GlobalStyle } from './styles/globals';

// Styles needed by some libs
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';

const App = () => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <Routes />
    </Provider>
    <ToastContainer />
  </>
);
export default App;
