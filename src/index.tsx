import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./components/app/app";
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from "./services/store";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
