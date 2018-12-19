import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { store } from "./_helpers";
import Template from "./template";

// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();

render(
  <Provider store={store}>
    <Template />
  </Provider>,
  document.getElementById("app")
);
