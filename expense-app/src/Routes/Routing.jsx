import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

export default class Routing extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact render={(props) => <Home {...props} />} />
                    <Route path="/home" render={(props) => <Home {...props} />} />
                    <Route path="/login" render={(props) => <Login {...props} />} />
                    <Route path="/register" render={(props) => <Register {...props} />} />
                    <Route><div style={{ color: "red" }}>Error 404</div><Link to='/'>GO back Home</Link></Route>
                </Switch>
            </div>
        );
    }
}