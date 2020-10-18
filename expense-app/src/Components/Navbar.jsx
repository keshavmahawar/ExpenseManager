import React from "react";
import { Link } from "react-router-dom";
import Routing from "../Routes/Routing";
import styled from "styled-components";
import { connect } from "react-redux";
import { loginLogout } from "../Redux/User/action";

const RouteStyle = styled.div`
    background: linear-gradient(135deg, #d6ff7f 0%, #00b3cc 100%);
    zindex: 1;
    min-height: calc(100vh - 90px);
    padding: 20px;
    width: 100%;
`;

const loginlinks = [
    {
        to: "/",
        title: "Home",
    },
    {
        to: "/register",
        title: "Register",
    },
    {
        to: "/login",
        title: "Login",
    },
];
const dashboardlinks = [
    {
        to: "/dashboard",
        title: "Dashboard",
    },
    {
        to: "/ledger",
        title: "Ledger",
    },
    {
        to: "/login",
        title: "Logout",
    },
];
const NavSpan = styled.span`
    margin: 20px;
    flex: 0.3;
`;
const NavSpanFlex = styled.span`
    display: inline-block;
    color: black;
    font-weight: lighter;
`;
const Logo = styled.span`
    margin: 20px;
    flex: 1;
`;
const LogoSpan = styled.span`
    font-weight: lighter;
    display: inline-block;
    color: black;
    font-size: 30px;
`;

const Nav = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    border: 1px solid gray;
`;
const NavItems = styled.div`
    display: flex;
    background: #ded9d2;
    min-height: 80px;
    align-items: center;
`;
class Navbar extends React.Component {

    render() {
        const { loginLogout, isLogin } = this.props;
        return (
            <div class="container-fluid" style={{ position: "relative" }}>
                <div class="row">
                    <div class="col-12" style={{ zIndex: 7 }}>
                        <div class="row">
                            <div class="col-12">
                                <Nav
                                    style={{
                                        boxShadow: "5px 10px 18px #888888",
                                    }}
                                >
                                    {!isLogin && (
                                        <NavItems>
                                            <Logo>
                                                <Link to={"/"}>
                                                    <LogoSpan>
                                                        {" "}
                                                        Expense-Manager{" "}
                                                    </LogoSpan>
                                                </Link>
                                            </Logo>
                                            {loginlinks.map(({ to, title }) => (
                                                <NavSpan>
                                                    <Link to={to} key={to}>
                                                        <NavSpanFlex>
                                                            {title}
                                                        </NavSpanFlex>
                                                    </Link>
                                                </NavSpan>
                                            ))}
                                        </NavItems>
                                    )}
                                    {isLogin && (
                                        <NavItems>
                                            <Logo>
                                                <Link to={"/"}>
                                                    <LogoSpan>
                                                        {" "}
                                                        Expense-Manager{" "}
                                                    </LogoSpan>
                                                </Link>
                                            </Logo>
                                            {dashboardlinks.map(
                                                ({ to, title }) => (
                                                    <NavSpan>
                                                        <Link to={to} key={to}>
                                                            {title ===
                                                                "Logout" ? (
                                                                    <NavSpanFlex
                                                                        onClick={() =>
                                                                            loginLogout()
                                                                        }
                                                                    >
                                                                        {title}
                                                                    </NavSpanFlex>
                                                                ) : (
                                                                    <NavSpanFlex>
                                                                        {title}
                                                                    </NavSpanFlex>
                                                                )}
                                                        </Link>
                                                    </NavSpan>
                                                )
                                            )}
                                        </NavItems>
                                    )}
                                </Nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ height: "90px" }}></div>
                <div class="row">
                    <RouteStyle class="col-12">
                        <Routing />
                    </RouteStyle>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLogin: state.user.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginLogout: () => dispatch(loginLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
