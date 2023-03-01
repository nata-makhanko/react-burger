import { _apiBase } from "../api";
import { request } from "../../utils/request";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';


export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        request(`${_apiBase}/ingredients`, {}).then(response => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: response.data,
            });
        })
            .catch(error => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            })
    }
};
