import { _apiBase } from "../api";
import { request } from "../../utils/request";

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export const SELECTED_ORDET_DETAILS = 'SELECTED_ORDET_DETAILS';
export const DELETE_ORDET_DETAILS = 'DELETE_ORDET_DETAILS';


export function getOrderDetails(ingredietntsID) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST,
        });
        request(`${_apiBase}/orders`, {
            method: "POST",
            body: JSON.stringify(ingredietntsID),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            dispatch({
                type: GET_ORDER_DETAILS_SUCCESS,
                orderDetails: response,
            });
        })
            .catch(error => {
                dispatch({
                    type: GET_ORDER_DETAILS_FAILED,
                });
            })
    }
}