import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { logInOutRed, searchRed } from "./redux/reducers";

const store = createStore(combineReducers({ logInOutRed, searchRed })); //redux store

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
