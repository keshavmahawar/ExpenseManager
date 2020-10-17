import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import user from "./User/reducer";
import transactions from "./Transactions/reducer";
import thunk from "redux-thunk";
import { dashboard } from "./Transactions/action";

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

// console.log(transactions);
const store = createStore(combineReducers({ user, transactions }), enhancer);
// store.dispatch(dashboard());
export default store;
