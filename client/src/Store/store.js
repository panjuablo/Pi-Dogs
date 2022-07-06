import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../Act-Red/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
