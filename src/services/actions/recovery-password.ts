import { _apiBase } from "../api";
import { requestWithToken } from "../../utils/request";
import { AppThunk, AppDispatch } from "../../utils/types";


export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_ISFOUNDEMAIL: 'RESET_ISFOUNDEMAIL' = 'RESET_ISFOUNDEMAIL';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
    isFoundEmail: boolean;
}
export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface IResetIsFoundEmailAction {
    readonly type: typeof RESET_ISFOUNDEMAIL;
}
export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    isResetPassword: boolean;
}
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TRecoveryPasswordActions = 
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetIsFoundEmailAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;

export const forgotPassword= (email: { email: string }): AppThunk  => (dispatch: AppDispatch) => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        });
        requestWithToken(`${_apiBase}/password-reset`, {
            method: "POST",
            body: JSON.stringify(email),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((res: {success: boolean}) => {
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                isFoundEmail: res.success,
            });
        })
            .catch(() => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                });
            })
}


export const resetPassword = (password: { [key: string]: string; }): AppThunk  => (dispatch: AppDispatch) => {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });
        requestWithToken(`${_apiBase}/password-reset/reset`, {
            method: "POST",
            body: JSON.stringify(password),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((res: {success: boolean}) => {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                isResetPassword: res.success,
            });
        })
            .catch(() => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                });
            })
}
