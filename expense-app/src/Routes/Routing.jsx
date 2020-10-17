import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Dashboard from "../Pages/Dashboard";
import Ledger from '../Pages/Ledger'
import PrivateRouting from '../Routes/PrivateRouting'

export default class Routing extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact render={(props) => <Home {...props} />} />
                    <Route path="/home" render={(props) => <Home {...props} />} />
                    <Route path="/login" render={(props) => <Login {...props} />} />
                    <Route path="/register" render={(props) => <Register {...props} />} />
                    <PrivateRouting>                  
                    <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
                    <Route path="/ledger" render={(props) => <Ledger {...props} />} /></PrivateRouting>
                    <Route><div style={{ color: "red" }}>Error 404</div><Link to='/'>GO back Home</Link></Route>
                </Switch>
            </div>
        );
    }
}