import { _apiBase } from "../api";
import { requestWithToken } from "../../utils/request";
import { getCookie, deleteCookie, setCookie } from "../../utils/cookies";


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED = 'GET_PROFILE_FAILED';

export const PATCH_PROFILE_REQUEST = 'PATCH_PROFILE_REQUEST';
export const PATCH_PROFILE_SUCCESS = 'PATCH_PROFILE_SUCCESS';
export const PATCH_PROFILE_FAILED = 'PATCH_PROFILE_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';


export function login(body) {
    console.log(body);
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/login`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            const authToken = response.accessToken.split('Bearer ')[1];
            const refreshToken = response.refreshToken;
            setCookie('token', authToken, { 'max-age': 1200 });
            localStorage.setItem('refreshToken', refreshToken);
            dispatch({
                type: LOGIN_SUCCESS,
                isUserLoaded: response.success,
            });
        })
            .catch(error => {
                dispatch({
                    type: LOGIN_FAILED,
                });
            })
    }
}

export function register(body) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/register`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            const authToken = response.accessToken.split('Bearer ')[1];
            const refreshToken = response.refreshToken;
            setCookie('token', authToken, { 'max-age': 1200 });
            localStorage.setItem('refreshToken', refreshToken);
            dispatch({
                type: REGISTER_SUCCESS,
                isUserLoaded: response.success,
            });
        })
            .catch(error => {
                dispatch({
                    type: REGISTER_FAILED,
                });
            })
    }
}

export function getProfile() {
    return function (dispatch) {
        dispatch({
            type: GET_PROFILE_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/user`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: 'Bearer ' + getCookie('token'),
            },
        }).then(response => {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                user: response.user,
                isUserLoaded: response.success,
            });
        })
            .catch(() => {
                dispatch({
                    type: GET_PROFILE_FAILED,
                });
            })
    }
}


export function patchProfile(body) {
    return function (dispatch) {
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
        }).then(response => {
            dispatch({
                type: PATCH_PROFILE_SUCCESS,
                user: response.user,
            });
        })
            .catch(error => {
                dispatch({
                    type: PATCH_PROFILE_FAILED,
                });
            })
    }
}



export function logout() {
    deleteCookie();
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        requestWithToken(`${_apiBase}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        }).then(response => {
            localStorage.removeItem('refreshToken');
            dispatch({
                type: LOGOUT_SUCCESS,
                isUserLoaded: !response.success,
            });
        })
            .catch(error => {
                dispatch({
                    type: LOGOUT_FAILED,
                });
            })
    }
} 