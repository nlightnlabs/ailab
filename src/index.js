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

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/SignIn" element={<SignIn />}/>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
    </PersistGate>
  </Provider>
)

