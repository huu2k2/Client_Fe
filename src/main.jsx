import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import {FilterCustomHook,ShowLoadingCustomHook} from '@customhooks'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ShowLoadingCustomHook>
    <FilterCustomHook>
      <ToastContainer className={'z-[200]'}/>
      <App />
    </FilterCustomHook>
    </ShowLoadingCustomHook>
  </Provider>
);
