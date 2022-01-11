import React from "react";
import ReactDOM from "react-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const options = {
    position: positions.TOP_CENTER,
    timeout: 2000,
    transition: transitions.FADE
  }
  
  const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  )
  
  ReactDOM.render(<Root />, document.getElementById('root'))

// ReactDOM.render(<App />, document.getElementById("root"));

// // If you want the app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.

serviceWorker.unregister();
