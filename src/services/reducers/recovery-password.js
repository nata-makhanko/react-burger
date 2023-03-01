import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED, RESET_ISFOUNDEMAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED } from '../actions/recovery-password';

const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    isFoundEmail: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    isResetPassword: false,
}

export const recoveryPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
                isFoundEmail: action.isFoundEmail,
            }
        case FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
                isFoundEmail: false
            }
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                isResetPassword: action.isResetPassword,
                isFoundEmail: false,
            }
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
                isResetPassword: false
            }
        case RESET_ISFOUNDEMAIL:
            return {
                ...state,
                isFoundEmail: false,
            }
        default:
            return state;

    }
}