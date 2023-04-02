import {  TOrderDetails, TOrderList } from "../../utils/types";
import type { TOrderDetailsActions } from "../actions/order-details";

import { 
    GET_ORDER_DETAILS_REQUEST, 
    GET_ORDER_DETAILS_SUCCESS, 
    GET_ORDER_DETAILS_FAILED, 
    DELETE_ORDET_DETAILS, 
    SELECTED_ORDET_DETAILS,
    GET_ORDER_LIST_REQUEST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILED, } from '../actions/order-details';

type TOrderDetailsState = {
    orderDetailsRequest: boolean,
    orderDetailsFailed: boolean,
    orderDetails: TOrderDetails,
    isLoading: boolean,
    isOpenModalOrder: boolean,
    orderNumber: number,
    orderListRequest: boolean,
    orderListFailed: boolean,
    orderList: TOrderList[],
    isLoadedOrderList: boolean,

}

export const initialState: TOrderDetailsState = {
    orderDetailsRequest: false,
    orderDetailsFailed: false,
    orderDetails: {},
    isLoading: false,

    isOpenModalOrder: false,
    orderNumber: 0,

    orderListRequest: false,
    orderListFailed: false,
    orderList: [],
    isLoadedOrderList: false,
}

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions): TOrderDetailsState => {
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
        case GET_ORDER_LIST_REQUEST: {
            return {
                ...state,
                orderListRequest: true,
            }
        }
        case GET_ORDER_LIST_SUCCESS: {
            return {
                ...state,
                orderListRequest: false,
                orderList: action.orderList, 
                isLoadedOrderList: true,
            }
        }
        case GET_ORDER_LIST_FAILED: {
            return {
                ...state,
                orderListRequest: false,
                orderListFailed: true,
                isLoadedOrderList: false,
            }
        }
        default:
            return state;
    }
}