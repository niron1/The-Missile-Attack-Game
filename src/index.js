import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./containers/App";
import {createStore,applyMiddleware,compose} from 'redux';
import reducer from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';


const middleware = [];

middleware.push(thunk);

if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger);
}
const persistedState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)


ReactDOM.render( <Provider store={store}>
      <App />
    </Provider>, document.getElementById("root"));
