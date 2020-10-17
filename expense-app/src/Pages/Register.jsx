import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../Redux/action";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'

const RegisterWrap = styled.div`
box-shadow:5px 10px 18px #888888;
background:#E2DBCC;
`
const Label = styled.div`
text-align:left;
display:block;
`
const FieldWrap = styled.div`
border-bottom: 0.5px solid black;
padding:3px;
`
const Button = styled.button`
outline:0px;
width:300px;
height:50px;
border:0px;
color:white;
background:#F65636;
border-radius:25px
`
const ErrWrap = styled.div`
min-height:25px;
font-style:italic;
color:red
`

class Register extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmit = ({ name, email, password }) => {
        let payload = {
            name: name,
            email: email,
            password: password
        }
        this.props.registerUser(payload)
    }
    render() {
        const { registrationStatus, isRegister, isError } = this.props
        //console.log("userdata", registrationStatus, isRegister, isError)      
        return (
            <RegisterWrap class="container" >
                <div class="row">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-12">
                                <Formik style={{ background: "#E2DBCC" }}
                                    initialValues={{ name: '', email: '', password: '' }}
                                    validationSchema={Yup.object({
                                        name: Yup.string()
                                            .min(4, 'Must be 4 characters or more')
                                            .required('Required'),
                                        email: Yup.string().email('Invalid email address').required('Required'),
                                        password: Yup.string()
                                            .min(6, 'Must be 6 characters or more')
                                            .required('Required'),
                                    })}
                                    onSubmit={(values, { setSubmitting }) => {
                                        this.handleSubmit(values)
                                        setTimeout(() => {
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    <Form style={{ padding: "30px", background: "#E2DBCC" }}>
                                        <Label htmlFor="name">Name</Label>
                                        <FieldWrap>
                                            <Field style={{
                                                outline: "none",
                                                border: "0px",
                                                width: "300px",
                                                background: "#E2DBCC"
                                            }} name="name"
                                                type="text" />
                                        </FieldWrap>
                                        <ErrWrap><ErrorMessage name="name" /></ErrWrap>
                                        <Label htmlFor="password">Password</Label>
                                        <FieldWrap>
                                            <Field style={{
                                                outline: "none",
                                                border: "0px",
                                                width: "300px",
                                                background: "#E2DBCC"
                                            }} name="password" type="password" />
                                        </FieldWrap>
                                        <ErrWrap><ErrorMessage name="password" /></ErrWrap>
                                        <Label htmlFor="email">Email Address</Label>
                                        <FieldWrap>
                                            <Field style={{
                                                outline: "none",
                                                border: "0px",
                                                width: "300px",
                                                background: "#E2DBCC"
                                            }} name="email" type="email" />
                                        </FieldWrap>
                                        <ErrWrap><ErrorMessage name="email" /></ErrWrap>
                                        <Button>SIGNUP</Button><br />
                                        <Link to={'/login'}>Already Member? Sign In</Link>
                                    </Form>
                                </Formik>
                                {isError &&
                                    <div style={{ color: "#F65636", fontFamily: "sans-serif", fontWeight: "bolder", fontSize: "25px", paddingTop: "20px" }}>Account already exists</div>
                                }
                                {isRegister &&
                                    <div style={{ color: "#0b8da0", fontFamily: "sans-serif", fontWeight: "bolder", fontSize: "25px", paddingTop: "20px" }}>
                                        {registrationStatus}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="col-1">
                        <div class="row">
                            <div class="col-12">
                                <img src='icon.jpg' style={{ width: "750px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </RegisterWrap>
        );
    }
}

const mapStateToProps = state => {
    return {
        isRegister: state.isRegister,
        registrationStatus: state.registrationStatus,
        isError: state.isError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registerUser: payload => dispatch(registerUser(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
