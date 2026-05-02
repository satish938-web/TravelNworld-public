import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import { Provider } from "react-redux";
import { store } from "./features/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1069073868862-8scedl7jk02708mnfe04o04l8sasq2on.apps.googleusercontent.com">
      <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
