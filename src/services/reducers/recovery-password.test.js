import { recoveryPasswordReducer, initialState } from "./recovery-password";
import * as types from '../actions/recovery-password';



describe('recovery password reducer', () => {
    it('should return the initial state', () => {
        expect(recoveryPasswordReducer(undefined, {})).toEqual(initialState)
    })

    it('case FORGOT_PASSWORD_REQUEST', () => {
        expect(recoveryPasswordReducer(initialState, {
            type: types.FORGOT_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: true
        })
    })

    it('case FORGOT_PASSWORD_SUCCESS', () => {
        expect(recoveryPasswordReducer({
            ...initialState,
            forgotPasswordRequest: true,

        }, {
            type: types.FORGOT_PASSWORD_SUCCESS,
            isFoundEmail: false,
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            isFoundEmail: false
        })

        expect(recoveryPasswordReducer(initialState, {
            type: types.FORGOT_PASSWORD_SUCCESS,
            isFoundEmail: true,
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            isFoundEmail: true
        })
    })

    it('case FORGOT_PASSWORD_FAILED', () => {
        expect(recoveryPasswordReducer(initialState, {
            type: types.FORGOT_PASSWORD_FAILED
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: true,
            isFoundEmail: false
        })
    })

    it('case RESET_PASSWORD_REQUEST', () => {
        expect(recoveryPasswordReducer(initialState, {
            type: types.RESET_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            resetPasswordRequest: true,
            resetPasswordFailed: false,
        })
    })

    it('case RESET_PASSWORD_SUCCESS', () => {
        expect(recoveryPasswordReducer({
            ...initialState,
            resetPasswordRequest: true,

        }, {
            type: types.RESET_PASSWORD_SUCCESS,
            isResetPassword: false,
        })).toEqual({
            ...initialState,
            isResetPassword: false,
            resetPasswordRequest: false,
        })
    })

    it('case RESET_PASSWORD_FAILED', () => {
        expect(recoveryPasswordReducer(initialState, {
            type: types.RESET_PASSWORD_FAILED
        })).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true,
            isResetPassword: false
        })
    })

    it('case RESET_ISFOUNDEMAIL', () => {
        expect(recoveryPasswordReducer({
            ...initialState,
            isFoundEmail: true,
        }, {
            type: types.RESET_ISFOUNDEMAIL
        })).toEqual({
            ...initialState,
            isFoundEmail: false,
        })
    })
})