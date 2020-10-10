import React from "react";
import { Link } from "react-router-dom";
import styles from './navbar.module.css'
import Routing from '../Routes/Routing'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

const links = [
    {
        to: "/",
        title: "Home"
    },
    {
        to: "/login",
        title: "Login"
    },
    {
        to: "/register",
        title: "Register"
    }

]
export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="container-fluid" style={{ position: "relative" }}>
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <div style={{ position: "fixed", top: "0px", left: "0px", width: "100%" }}>
                                    <div style={{ display: "flex", background: "#DED9D2", alignItems: "center" }}>
                                        <h4 style={{ flex: 0.5 , fontWeight:"lighter"}}> Expense-Manager </h4>
                                        {links.map(({ to, title }) => (
                                            <Link className={styles.linkstyle} to={to} key={to}>
                                                {title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12" className={styles.routes}>
                            <Routing />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}