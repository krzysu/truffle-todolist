import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {reducer as accountReducer} from "./store/account/reducer";
import {reducer as todosReducer} from "./store/todos/reducer";
import App from "./App";

import "./index.css";

const rootReducer = combineReducers({
  account: accountReducer,
  todos: todosReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
