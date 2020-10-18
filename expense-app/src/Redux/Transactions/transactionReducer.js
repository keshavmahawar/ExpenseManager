import {
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,
    DASHBOARD_FAILURE,
    LEDGER_REQUEST,
    LEDGER_SUCCESS,
    LEDGER_FAILURE,
} from "./actionTypes";

const initStore = {
    recentTransactions: [],
    isLoading: false,
    ledgerTransactions: [],
    page: 1,
    totalPage: 1,
    type: null,
    error: null,
    success: null,
    credit: 0,
    debit: 0,
};

const transactionReducer = (state = initStore, { type, payload }) => {
    switch (type) {
        case DASHBOARD_REQUEST:
            return { ...state, isLoading: true };
        case DASHBOARD_SUCCESS: {
            const { credit, debit, transactions } = payload;

            return {
                ...state,
                isLoading: false,
                recentTransactions: transactions,
                credit,
                debit,
            };
        }
        case DASHBOARD_FAILURE: {
            return {
                ...state,
                error: payload,
                isLoading: false,
            };
        }
        case LEDGER_REQUEST: {
            const { page, type } = payload;
            return { ...state, isLoading: true, type, page };
        }
        case LEDGER_SUCCESS: {
            const { pageNo, totalPage, totalCount, transactions } = payload;
            return {
                ...state,
                isLoading: false,
                ledgerTransactions: transactions,
                totalPage,
                page: pageNo,
            };
        }
        case LEDGER_FAILURE: {
            return {
                ...state,
                error: payload,
                isLoading: false,
            };
        }
        default:
            return state;
    }
};
export default transactionReducer;
