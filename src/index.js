import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './mainStyle.css'
import App from './App'
import Home from "./Home"
import SignIn from "./modules/authentication/modules/SignIn"
import SignUp from "./modules/authentication/modules/SignUp"
import ResetPassword from "./modules/authentication/modules/ResetPassword"

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

console.log("ailab is running")
console.log("Environment: ",process.env.NODE_ENV)


root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
)

