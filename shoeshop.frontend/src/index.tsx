import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/stores/configure-store';
import Axios from 'axios';

Axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
Axios.defaults.withCredentials = true;

Axios.interceptors.response.use((response) => {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
  return response;
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
