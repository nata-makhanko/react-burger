import { TUser } from '../../utils/types';
import type {TAuthActions} from '../actions/auth';

import { 
    GET_PROFILE_REQUEST, 
    GET_PROFILE_SUCCESS, 
    GET_PROFILE_FAILED, 
    PATCH_PROFILE_REQUEST, 
    PATCH_PROFILE_SUCCESS, 
    PATCH_PROFILE_FAILED, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    LOGOUT_REQUEST, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILED, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAILED } from '../actions/auth';

import { getCookie } from '../../utils/cookies';

type TAuthState = {
    profileRequest: boolean,
    profileFailed: boolean,
    user: TUser | {},
    loginRequest: boolean,
    loginFailed: boolean,
    isUserLoaded: boolean,
    registerRequest: boolean,
    registerFailed: boolean,
    logoutRequest: boolean,
    logoutFailed: boolean,
    isLoggedIn: boolean,
    authauthorized: boolean,
}

export const initialState = {
    profileRequest: false,
    profileFailed: false,
    user: {},

    loginRequest: false,
    loginFailed: false,
    isUserLoaded: false,

    registerRequest: false,
    registerFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    isLoggedIn: false,

    authauthorized: !!getCookie('token'),

}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
    switch (action.type) {
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                profileRequest: true,
                profileFailed: false,
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profileRequest: false,
                profileFailed: false,
                user: action.user,
                isUserLoaded: action.isUserLoaded,
                isLoggedIn: true,
            }
        case GET_PROFILE_FAILED:
            return {
                ...state,
                profileRequest: false,
                profileFailed: true,
                user: {}
            }
        case PATCH_PROFILE_REQUEST:
            return {
                ...state,
                profileRequest: true,
                profileFailed: false,
                user: {}
            }
        case PATCH_PROFILE_SUCCESS:
            return {
                ...state,
                profileRequest: false,
                profileFailed: false,
                user: action.user,
            }
        case PATCH_PROFILE_FAILED:
            return {
                ...state,
                profileRequest: false,
                profileFailed: true,
                user: {}
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginRequest: false,
                loginFailed: false,
                isUserLoaded: action.isUserLoaded,
                isLoggedIn: true,
                authauthorized: !!getCookie('token'),
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginRequest: false,
                loginFailed: true,
                isUserLoaded: false
            }

        case REGISTER_REQUEST:
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerRequest: false,
                registerFailed: false,
                isUserLoaded: action.isUserLoaded,
            }
        case REGISTER_FAILED:
            return {
                ...state,
                registerRequest: false,
                registerFailed: true,
                isUserLoaded: false,
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: false,
                isUserLoaded: action.isUserLoaded,
                user: {},
                isLoggedIn: false,
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
            }
        default:
            return state;

    }
}