import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userReducer from './User/userReducer'
import transactionReducer from "./Transactions/transactionReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({ user:userReducer,trans:transactionReducer });

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
const store = createStore(rootReducer, enhancer);
// store.dispatch(dashboard());
export default store;
