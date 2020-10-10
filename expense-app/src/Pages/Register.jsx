import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { registerUser } from "../Redux/action";
import styles from './pages.module.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
            <React.Fragment>
                <Formik
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
                            //alert(registrationStatus);
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form>
                        <label htmlFor="name">Name</label>
                        <Field name="name" type="text" /><br />
                        <ErrorMessage name="name" /><br />
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" /><br />
                        <ErrorMessage name="password" /><br />
                        <label htmlFor="email">Email Address</label>
                        <Field name="email" type="email" /><br />
                        <ErrorMessage name="email" /><br />
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
                {isError &&
                    <div>Account already exists</div>
                }
                {isRegister &&
                    <div>
                        {registrationStatus}
                    </div>
                }
            </React.Fragment >
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
