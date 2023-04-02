import { _apiBase } from "../api";
import { requestWithToken } from "../../utils/request";
import { getCookie } from "../../utils/cookies";
import { AppThunk, AppDispatch, TOrderDetails, TOrderList } from "../../utils/types";


export const GET_ORDER_DETAILS_REQUEST:'GET_ORDER_DETAILS_REQUEST'  = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS: 'GET_ORDER_DETAILS_SUCCESS' = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED: 'GET_ORDER_DETAILS_FAILED' = 'GET_ORDER_DETAILS_FAILED';

export const SELECTED_ORDET_DETAILS: 'SELECTED_ORDET_DETAILS' = 'SELECTED_ORDET_DETAILS';
export const DELETE_ORDET_DETAILS: 'DELETE_ORDET_DETAILS' = 'DELETE_ORDET_DETAILS';

export const GET_ORDER_LIST_REQUEST: 'GET_ORDER_LIST_REQUEST' = 'GET_ORDER_LIST_REQUEST';
export const GET_ORDER_LIST_SUCCESS: 'GET_ORDER_LIST_SUCCESS' = 'GET_ORDER_LIST_SUCCESS';
export const GET_ORDER_LIST_FAILED: 'GET_ORDER_LIST_FAILED' = 'GET_ORDER_LIST_FAILED';

export interface IGetOrderDetailsRequestAction {
    readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}

export interface IGetOrderDetailsSuccessAction {
    readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
    orderDetails: TOrderDetails,
}

export interface IGetOrderDetailsFailedAction {
    readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

export interface ISelectedOrderDetailsAction {
    readonly type: typeof SELECTED_ORDET_DETAILS;
}

export interface IDeleteOrderDetailsAction {
    readonly type: typeof DELETE_ORDET_DETAILS;
}

export interface IGetOrderListRequestAction {
    readonly type: typeof GET_ORDER_LIST_REQUEST;
}
export interface IGetOrderListSuccessAction {
    readonly type: typeof GET_ORDER_LIST_SUCCESS;
    orderList: TOrderList[],
}
export interface IGetOrderListFailedAction {
    readonly type: typeof GET_ORDER_LIST_FAILED;
}

export type TOrderDetailsActions = 
    | IGetOrderDetailsRequestAction
    | IGetOrderDetailsSuccessAction
    | IGetOrderDetailsFailedAction
    | ISelectedOrderDetailsAction
    | IDeleteOrderDetailsAction
    | IGetOrderListRequestAction
    | IGetOrderListSuccessAction
    | IGetOrderListFailedAction;

export const getOrderDetails = (ingredietntsID: { ingredients: string[]; }): AppThunk => (dispatch: AppDispatch) => {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST,
        });
        requestWithToken(`${_apiBase}/orders`, {
            method: "POST",
            body: JSON.stringify(ingredietntsID),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: 'Bearer ' + getCookie('token'),
            }
        }).then((res: TOrderDetails) => {
            dispatch({
                type: GET_ORDER_DETAILS_SUCCESS,
                orderDetails: res,
            });
        })
            .catch(() => {
                dispatch({
                    type: GET_ORDER_DETAILS_FAILED,
                });
            })
}

export const getOrderList = (orderNunber: string): AppThunk => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_ORDER_LIST_REQUEST,
    });
    requestWithToken(`${_apiBase}/orders/${orderNunber}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    .then((res) => {
        dispatch({
            type: GET_ORDER_LIST_SUCCESS,
            orderList: res.orders,
        });
    })
    .catch(() => {
        dispatch({
            type: GET_ORDER_LIST_FAILED,
        });
    })
}


