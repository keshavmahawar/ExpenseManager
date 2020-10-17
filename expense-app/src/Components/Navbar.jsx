import React from "react";
import { Link } from "react-router-dom";
import Routing from '../Routes/Routing'
import styled from 'styled-components'
import { connect } from "react-redux";
import { loginLogout } from '../Redux/action'

const RouteStyle = styled.div`
position: absolute;
background: linear-gradient(135deg, #D6FF7F 0%, #00B3CC 100%);
zIndex:1;
width:100%;
top:100px;
left:100px;
right:100px
}
`

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
    },
    {
        to: "/dashboard",
        title: "Dashboard"
    },
    {
        to: "/ledger",
        title: "Ledger"
    }
]
const NavSpan = styled.span`
margin:20px;
flex:0.3
`
const NavSpanFlex = styled.span`
display:inline-block;
color:black;
font-weight: lighter;
`
const Logo = styled.span`
margin:20px;
flex:1 
`
const LogoSpan = styled.span` 
font-weight:lighter;
display:inline-block;
color:black;
font-size:30px;
`

const Nav = styled.div`
position:fixed;
top:0px;
left:0px;
width:100%;
border:1px solid gray;
`
const NavItems = styled.div`
display: flex;
background: #DED9D2;
min-height:80px;
align-items:center
`
class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { loginLogout, isLogin } = this.props
        return (
            <div class="container-fluid" style={{ position: "relative" }}>
                <div class="row">
                    <div class="col-12" style={{ zIndex: 7 }}>
                        <div class="row">
                            <div class="col-12">
                                <Nav style={{ boxShadow: "5px 10px 18px #888888" }}>
                                    <NavItems>
                                        <Logo><Link to={'/'}><LogoSpan> Expense-Manager </LogoSpan></Link></Logo>
                                        {links.map(({ to, title }) => (
                                            <NavSpan><Link to={to} key={to}>
                                                {title === "Login" ? isLogin ? <NavSpanFlex onClick={() => loginLogout()}>Logout</NavSpanFlex> : <NavSpanFlex>Login</NavSpanFlex> : <NavSpanFlex>{title}</NavSpanFlex>}
                                            </Link></NavSpan>
                                        ))}
                                    </NavItems>
                                </Nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">                    
                            <RouteStyle class="col-12" >
                                <Routing />
                            </RouteStyle>                        
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLogin: state.isLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginLogout: () => dispatch(loginLogout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);