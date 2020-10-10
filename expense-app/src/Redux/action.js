import axios from "axios";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './actionTypes'

const registerRequest = payload => {
  return {
    type: REGISTER_REQUEST,
    payload 
  };
};

const registerSuccess = payload => {
  return {
    type: REGISTER_SUCCESS,
    payload
  };
};

const registerFailure = payload => {
  return {
    type: REGISTER_FAILURE,
    payload
  };
};

const registerUser = (payload) => dispatch => {
  dispatch(registerRequest());
  return axios.post("http://localhost:5000/user/register", payload)   
    .then(res => res.data.message)
    .then(res => dispatch(registerSuccess(res)))
    .catch(err => dispatch(registerFailure(err)))
};

export {
  registerUser,
  registerFailure,
  registerRequest,
  registerSuccess,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
};