import { _apiBase } from "../api";
import { requestWithToken } from "../../utils/request";
import { getCookie, deleteCookie, setCookie } from "../../utils/cookies";
import { AppThunk, AppDispatch, TUser } from "../../utils/types";


export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST' = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS' = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED: 'GET_PROFILE_FAILED' = 'GET_PROFILE_FAILED';

export const PATCH_PROFILE_REQUEST: 'PATCH_PROFILE_REQUEST' = 'PATCH_PROFILE_REQUEST';
export const PATCH_PROFILE_SUCCESS: 'PATCH_PROFILE_SUCCESS' = 'PATCH_PROFILE_SUCCESS';
export const PATCH_PROFILE_FAILED: 'PATCH_PROFILE_FAILED' = 'PATCH_PROFILE_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    isUserLoaded: boolean;
}
export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    isUserLoaded: boolean;
}
export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface IGetProfileRequestAction {
    readonly type: typeof GET_PROFILE_REQUEST;
}
export interface IGetProfileSuccessAction {
    readonly type: typeof GET_PROFILE_SUCCESS;
    user: TUser;
    isUserLoaded: boolean;
}
export interface IGetProfileFailedAction {
    readonly type: typeof GET_PROFILE_FAILED;
}

export interface IPatchProfileRequestAction {
    readonly type: typeof PATCH_PROFILE_REQUEST;
}
export interface IPatchProfileSuccessAction {
    readonly type: typeof PATCH_PROFILE_SUCCESS;
    user: TUser;
}
export interface IPatchProfileFailedAction {
    readonly type: typeof PATCH_PROFILE_FAILED;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
    isUserLoaded: boolean;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export type TAuthActions = 
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | IGetProfileRequestAction
    | IGetProfileSuccessAction
    | IGetProfileFailedAction
    | IPatchProfileRequestAction
    | IPatchProfileSuccessAction
    | IPatchProfileFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction;

export const login = (body: {[key: string]: string}): AppThunk => (dispatch: AppDispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/login`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((res: {accessToken: string, refreshToken: string, success: boolean}) => {
            const authToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('token', authToken, { 'max-age': 1200 });
            localStorage.setItem('refreshToken', refreshToken);
            dispatch({
                type: LOGIN_SUCCESS,
                isUserLoaded: res.success,
            });
        })
            .catch(() => {
                dispatch({
                    type: LOGIN_FAILED,
                });
            })
}


export const register = (body: { email: string, password: string, name: string }): AppThunk => (dispatch: AppDispatch) => {
        dispatch({
            type: REGISTER_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/register`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((res: {accessToken: string, refreshToken: string, success: boolean}) => {
            const authToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('token', authToken, { 'max-age': 1200 });
            localStorage.setItem('refreshToken', refreshToken);
            dispatch({
                type: REGISTER_SUCCESS,
                isUserLoaded: res.success,
            });
        })
            .catch(() => {
                dispatch({
                    type: REGISTER_FAILED,
                });
            })
}


export const getProfile = (): AppThunk => (dispatch: AppDispatch) => {
        dispatch({
            type: GET_PROFILE_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/user`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: 'Bearer ' + getCookie('token'),
            },
        }).then((res: {user: TUser, success: boolean}) => {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                user: res.user,
                isUserLoaded: res.success,
            });
        })
            .catch(() => {
                dispatch({
                    type: GET_PROFILE_FAILED,
                });
            })
}


export const patchProfile = (body: { [key: string]: string; }): AppThunk => (dispatch: AppDispatch) => {
        dispatch({
            type: PATCH_PROFILE_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: 'Bearer ' + getCookie('token'),
            },
            body: JSON.stringify(body),
        }).then((res: {user: TUser}) => {
            dispatch({
                type: PATCH_PROFILE_SUCCESS,
                user: res.user,
            });
        })
            .catch(() => {
                dispatch({
                    type: PATCH_PROFILE_FAILED,
                });
            })
}



export const logout = (): AppThunk => {
    deleteCookie();
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        }).then((res: {success: boolean}) => {
            localStorage.removeItem('refreshToken');
            dispatch({
                type: LOGOUT_SUCCESS,
                isUserLoaded: !res.success,
            });
        })
            .catch(() => {
                dispatch({
                    type: LOGOUT_FAILED,
                });
            })
    }
} 