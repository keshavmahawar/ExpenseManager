import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducer from './reducer'
import thunk from "redux-thunk";

//const rootReducer = combineReducers({ regis: registerReducer,login: loginReducer,app:gitDashReducer,prof:profileReducer });

let composeEnhancers = compose;
/* IF THUNK IS NOT INSTALLED THEN WRITE UR OWN THUNK
const thunk=store=>next=>action=>{
  typeof action === "function" ? action(store.dispatch) : next(action)
}
 */
if (process.env.NODE_ENV !== "production") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

export default store;