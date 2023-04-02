import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./components/app/app";
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from "./services/store";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);
