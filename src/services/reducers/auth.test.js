import { authReducer, initialState } from "./auth";
import * as types from '../actions/auth';


const user = {
    email: 'mail@mail.ru',
    name: 'Mail',
}

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    it('case GET_PROFILE_REQUEST', () => {
        expect(authReducer(initialState, {
            type: types.GET_PROFILE_REQUEST
        })).toEqual({
            ...initialState,
            profileRequest: true,
            profileFailed: false,
        })
    })

    it('case GET_PROFILE_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: types.GET_PROFILE_SUCCESS,
            user: user,
            isUserLoaded: true,
        })).toEqual({
            ...initialState,
            profileRequest: false,
            profileFailed: false,
            user: user,
            isUserLoaded: true,
            isLoggedIn: true,

        })
    })

    it('case GET_PROFILE_FAILED', () => {
        expect(authReducer({
            ...initialState,
            profileRequest: true,
        }, {
            type: types.GET_PROFILE_FAILED
        })).toEqual({
            ...initialState,
            profileRequest: false,
            profileFailed: true,
            user: {}
        })
    })

    it('case PATCH_PROFILE_REQUEST', () => {
        expect(authReducer({
            ...initialState,
            user: user,
        }, {
            type: types.PATCH_PROFILE_REQUEST
        })).toEqual({
            ...initialState,
            profileRequest: true,
            profileFailed: false,
            user: {}
        })
    })

    it('case PATCH_PROFILE_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: types.PATCH_PROFILE_SUCCESS,
            user: user,
        })).toEqual({
            ...initialState,
            profileRequest: false,
            profileFailed: false,
            user: user,

        })
    })

    it('case PATCH_PROFILE_FAILED', () => {
        expect(authReducer({
            ...initialState,
            profileRequest: true,
        }, {
            type: types.PATCH_PROFILE_FAILED
        })).toEqual({
            ...initialState,
            profileRequest: false,
            profileFailed: true,
            user: {}
        })
    })

    it('case LOGIN_REQUEST', () => {
        expect(authReducer(initialState, {
            type: types.LOGIN_REQUEST
        })).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailed: false,
        })
    })

    it('case LOGIN_SUCCESS', () => {
        expect(authReducer({
            ...initialState,
            loginRequest: true,
        }, {
            type: types.LOGIN_SUCCESS,
            isUserLoaded: true,
        })).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: false,
            isUserLoaded: true,
            isLoggedIn: true,
        })
    })

    it('case LOGIN_FAILED', () => {
        expect(authReducer({
            ...initialState,
            loginRequest: true,
            isUserLoaded: true
        }, {
            type: types.LOGIN_FAILED
        })).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true,
            isUserLoaded: false
        })
    })

    it('case REGISTER_REQUEST', () => {
        expect(authReducer(initialState, {
            type: types.REGISTER_REQUEST
        })).toEqual({
            ...initialState,
            registerRequest: true,
            registerFailed: false,
        })
    })

    it('case REGISTER_SUCCESS', () => {
        expect(authReducer({
            ...initialState,
            registerRequest: true,
        }, {
            type: types.REGISTER_SUCCESS,
            isUserLoaded: true,
        })).toEqual({
            ...initialState,
            registerRequest: false,
            registerFailed: false,
            isUserLoaded: true,
        })
    })

    it('case REGISTER_FAILED', () => {
        expect(authReducer({
            ...initialState,
            registerRequest: true,
            isUserLoaded: true
        }, {
            type: types.REGISTER_FAILED
        })).toEqual({
            ...initialState,
            registerRequest: false,
            registerFailed: true,
            isUserLoaded: false,
        })
    })

    it('case LOGOUT_REQUEST', () => {
        expect(authReducer({
            ...initialState,
            user: user,
        }, {
            type: types.LOGOUT_REQUEST
        })).toEqual({
            ...initialState,
            user: user,
            logoutRequest: false,
            logoutFailed: true,
        })
    })

    it('case LOGOUT_SUCCESS', () => {
        expect(authReducer({
            ...initialState,
            logoutRequest: true,
            user: user,
            isLoggedIn: true,
        }, {
            type: types.LOGOUT_SUCCESS,
            isUserLoaded: false,
        })).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutFailed: false,
            isUserLoaded: false,
            user: {},
            isLoggedIn: false,
        })
    })

    it('case LOGOUT_FAILED', () => {
        expect(authReducer({
            ...initialState,
            logoutRequest: true,
            isUserLoaded: true,
            user: user,
        }, {
            type: types.LOGOUT_FAILED
        })).toEqual({
            ...initialState,
            isUserLoaded: true,
            user: user,
            logoutRequest: false,
            logoutFailed: true,
        })
    })

})

