import axios from "axios";
import {
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,
    DASHBOARD_FAILURE,
    TRANSACTION_REQUEST,
    TRANSACTION_FAILURE,
    TRANSACTION_SUCCESS,
    LEDGER_REQUEST,
    LEDGER_SUCCESS,
    LEDGER_FAILURE,
} from "./actionTypes";

export const dashboardRequest = (payload) => {
    return {
        type: DASHBOARD_REQUEST,
        payload,
    };
};

export const dashboardSuccess = (payload) => {
    return {
        type: DASHBOARD_SUCCESS,
        payload,
    };
};

export const dashboardFailure = (payload) => {
    return {
        type: DASHBOARD_FAILURE,
        payload,
    };
};

export const dashboard = (payload) => (dispatch, getState) => {
    let authToken = getState().user.authToken;
    return axios
        .get("http://localhost:5000/transaction/dashboard", {
            headers: {
                Authorization: authToken,
            },
        })
        .then((res) => {
            console.log(res);
            dispatch(dashboardSuccess(res.data));
        })
        .catch((err) =>
            dispatch(dashboardFailure(err?.response?.data?.message))
        );
};

export const transactionRequest = (payload) => {
    return {
        type: TRANSACTION_REQUEST,
        payload,
    };
};

export const transactionSuccess = (payload) => {
    return {
        type: TRANSACTION_SUCCESS,
        payload,
    };
};

export const transactionFailure = (payload) => {
    return {
        type: TRANSACTION_FAILURE,
        payload,
    };
};

export const addTransaction = (payload) => (dispatch) => {
    dispatch(transactionRequest());
    return axios
        .post("http://localhost:5000/transaction/add", payload)
        .then((res) => res.data.message)
        .then((res) => dispatch(transactionSuccess(res)))
        .catch((err) => dispatch(transactionFailure(err)));
};

export const ledgerRequest = (payload) => {
    return {
        type: LEDGER_REQUEST,
        payload,
    };
};

export const ledgerSuccess = (payload) => {
    return {
        type: LEDGER_SUCCESS,
        payload,
    };
};

export const ledgerFailure = (payload) => {
    return {
        type: LEDGER_FAILURE,
        payload,
    };
};

export const ledger = (payload) => (dispatch, getState) => {
    const type = payload?.type || "all";
    const page = Number(payload?.page) || 1;

    let params = { page };
    dispatch(ledgerRequest({ page, type }));
    if (type === "credit" || type === "debit") {
        params = { ...params, type };
    }

    let authToken = getState().user.authToken;

    axios
        .get("http://localhost:5000/transaction", {
            params,
            headers: {
                Authorization: authToken,
            },
        })
        .then((res) => res.data)
        .then((res) => dispatch(ledgerSuccess(res)))
        .catch((err) => dispatch(ledgerFailure(err?.response?.data)));
};
