import { _apiBase } from "../api";
import { requestWithToken } from "../../utils/request";


export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_ISFOUNDEMAIL = 'RESET_ISFOUNDEMAIL';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


export function forgotPassword(email) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        });
        requestWithToken(`${_apiBase}/password-reset`, {
            method: "POST",
            body: JSON.stringify(email),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                isFoundEmail: response.success,
            });
        })
            .catch(error => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                });
            })
    }
}

export function resetPassword(password) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });
        requestWithToken(`${_apiBase}/password-reset/reset`, {
            method: "POST",
            body: JSON.stringify(password),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                isResetPassword: response.success,
            });
        })
            .catch(error => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                });
            })
    }
}