import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './action'

const initStore = {
    isRegister: false,
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
        default:
            return state;
    }
};
export default registerReducer