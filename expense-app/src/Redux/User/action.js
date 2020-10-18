import axios from "axios";
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
} from "./actionTypes";
import { dashboard, ledger } from "../Transactions/action";
const registerRequest = (payload) => {
    return {
        type: REGISTER_REQUEST,
        payload,
    };
};

const registerSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload,
    };
};

const registerFailure = (payload) => {
    return {
        type: REGISTER_FAILURE,
        payload,
    };
};

const registerUser = (payload) => (dispatch) => {
    dispatch(registerRequest());
    return axios
        .post("http://localhost:5000/user/register", payload)
        .then((res) => res.data.message)
        .then((res) => dispatch(registerSuccess(res)))
        .catch((err) => dispatch(registerFailure(err)))
};
const loginRequest = (payload) => {
    return {
        type: LOGIN_REQUEST,
        payload,
    };
};

const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload,
    };
};

const loginFailure = (payload) => {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
};
const loginLogout = () => {
    return {
        type: LOGIN_LOGOUT,
    };
};

const loginUser = (payload) => (dispatch) => {
    dispatch(loginRequest());
    return axios
        .post("http://localhost:5000/user/login", payload)
        .then((res) => res.data.auth)
        .then((res) => {
            dispatch(loginSuccess(res));
            dispatch(dashboard());
            dispatch(ledger());
        })
        .catch((err) => dispatch(loginFailure(err?.response?.data)));
};

export {
    registerUser,
    registerFailure,
    registerRequest,
    registerSuccess,
    loginUser,
    loginFailure,
    loginRequest,
    loginSuccess,
    loginLogout,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
};
