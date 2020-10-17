import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../Redux/User/action";
import { Link, Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const Label = styled.div`
    text-align: left;
    display: block;
`;
const FieldWrap = styled.div`
    border-bottom: 0.5px solid black;
    padding: 3px;
`;
const Button = styled.button`
    outline: 0px;
    width: 300px;
    height: 50px;
    border: 0px;
    color: white;
    background: #f65636;
    border-radius: 25px;
`;
const ImgLeft = styled.img`
    height: 350px;
    width: 350px;
    border-radius: 20px;
`;
const ErrWrap = styled.div`
    min-height: 25px;
    font-style: italic;
    color: red;
`;
const ImgRight = styled.img`
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 350px;
    width: 350px;
    border-radius: 20px;
`;
const Rightdiv = styled.div`
    box-shadow: 5px 10px 18px #888888;
    min-height: 650px;
    position: relative;
    background: #00816d;
    max-width: 350px;
    zindex: 1;
    border-radius: 20px;
`;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true,
            email: "",
            password: "",
        };
    }
    handleSubmit = ({ email, password }) => {
        let payload = {
            email: email,
            password: password,
        };
        this.props.loginUser(payload);
    };
    //handleSpinner = () => {
    //    setTimeout = (() => {
    //        this.props.history.push('/')
    //    }, 1000)
    //}

    render() {
        const { loginStatus, isLogin, isError } = this.props;
        //console.log("isError", isError, isLogin)
        return (
            <div class="container ">
                <div class="row">
                    <div class="col-md-4 offset-md-1">
                        <div class="row ">
                            <div class="col-12 ">
                                <Formik
                                    initialValues={{
                                        email: "kes.mahawar@gmail.com",
                                        password: "pass1234",
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string()
                                            .email("Invalid email address")
                                            .required("Required"),
                                        password: Yup.string()
                                            .min(
                                                6,
                                                "Must be 6 characters or more"
                                            )
                                            .required("Required"),
                                    })}
                                    onSubmit={(values, { setSubmitting }) => {
                                        this.handleSubmit(values);
                                        setTimeout(() => {
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    <Form
                                        style={{
                                            boxShadow: "5px 10px 18px #888888",
                                            background: "#00816D",
                                            maxWidth: "350px",
                                            zIndex: 3,
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <div>
                                            <ImgLeft src="mobile.png" />
                                        </div>
                                        <div style={{ padding: "30px" }}>
                                            <Label htmlFor="email">
                                                Email Address
                                            </Label>
                                            <FieldWrap>
                                                <Field
                                                    style={{
                                                        outline: "none",
                                                        border: "0px",
                                                        width: "300px",
                                                        background: "#00816D",
                                                    }}
                                                    name="email"
                                                    type="email"
                                                />
                                            </FieldWrap>
                                            <ErrWrap>
                                                <ErrorMessage name="email" />
                                            </ErrWrap>
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <FieldWrap>
                                                <Field
                                                    style={{
                                                        outline: "none",
                                                        border: "0px",
                                                        width: "300px",
                                                        background: "#00816D",
                                                    }}
                                                    name="password"
                                                    type="password"
                                                />
                                            </FieldWrap>
                                            <ErrWrap>
                                                <ErrorMessage name="password" />
                                            </ErrWrap>
                                            <Button>LOGIN</Button>
                                            <br />
                                            <Link to={"/login"}>
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 offset-md-2">
                        <div class="row ">
                            <div class="col-12 ">
                                <Rightdiv>
                                    <div style={{ padding: "30px" }}>
                                        <Label htmlFor="email">
                                            Welcome Back
                                        </Label>
                                        {isError && <div>Wrong password</div>}
                                        {isLogin && (
                                            <div>
                                                <div
                                                    style={{
                                                        color: "#E2FFED",
                                                        fontFamily:
                                                            "sans-serif",
                                                        fontWeight: "bolder",
                                                        fontSize: "25px",
                                                        paddingTop: "50px",
                                                    }}
                                                >
                                                    {loginStatus}
                                                </div>
                                                <i class="fas fa-spinner fa-pulse"></i>
                                                <Redirect
                                                    to={"/dashboard"}
                                                ></Redirect>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <ImgRight src="mobilebot.png" />
                                    </div>
                                </Rightdiv>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.user.isLogin,
        loginStatus: state.user.loginStatus,
        isError: state.user.isError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (payload) => dispatch(loginUser(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
