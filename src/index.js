import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import { store } from "./redux/store";
import { Provider } from "react-redux";

// layouts

import Home from "./layout/Home";

ReactDOM.render(
  
  <BrowserRouter>
      <Provider store={store}>

    <Switch>
      {/* add routes with layouts */}
      <Route path="/" component={Home} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// serviceWorkerRegistration.register();
