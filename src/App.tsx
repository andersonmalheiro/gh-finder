import React from 'react';
import { GlobalStyle } from './styles/globals';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Routes } from 'routes';

// Styles needed by some libs
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <Routes />
      </Provider>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
