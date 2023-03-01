import { GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_FAILED, DELETE_ORDET_DETAILS, SELECTED_ORDET_DETAILS } from '../actions/order-details';

const initialState = {
    orderDetailsRequest: false,
    orderDetailsFailed: false,
    orderDetails: {},
    isLoading: false,

    isOpenModalOrder: false,
    orderNumber: 0,
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                orderDetailsRequest: true,
                orderDetailsFailed: false,
                isLoading: true,
            }
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderDetailsRequest: false,
                orderDetailsFailed: false,
                orderDetails: action.orderDetails,
                isLoading: false,
            }
        case GET_ORDER_DETAILS_FAILED:
            return {
                ...state,
                orderDetailsRequest: true,
                orderDetailsFailed: false,
                orderDetails: {},
                isLoading: false,
            }
        case SELECTED_ORDET_DETAILS:
            return {
                ...state,
                isOpenModalOrder: true,

            }
        case DELETE_ORDET_DETAILS:
            return {
                ...state,
                orderDetails: {},
                isOpenModalOrder: false,
                orderNumber: 0,
            }
        default:
            return state;
    }
}