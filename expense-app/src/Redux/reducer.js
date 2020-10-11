import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOGOUT } from './action'

const initStore = {
    isRegister: false,
    isLogin: false,
    loginStatus: [],
    registrationStatus: [],
    isError: false
};

const registerReducer = (state = initStore, { type, payload }) => {
    switch (type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isRegister: false,
                isError: false

            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegister: true,
                registrationStatus: payload,
                isError: false
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                isRegister: false,
                registrationStatus: payload,
                isError: true
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                isLogin: false,
                isError: false

            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                loginStatus: payload,
                isError: false
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLogin: false,
                isError: true
            };
        case LOGIN_LOGOUT:
            return {
                ...state,
                isLogin: false,
            };
        default:
            return state;
    }
};
export default registerReducer