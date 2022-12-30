import { _apiBase } from "../api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SELECTED_INGREDIENT = 'SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export const SELECTED_ORDET_DETAILS = 'SELECTED_ORDET_DETAILS';
export const DELETE_ORDET_DETAILS = 'DELETE_ORDET_DETAILS';



export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        fetch(`${_apiBase}/ingredients`)
            .then(res => {
                if (res && res.ok) {
                    return res.json()
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED,
                    });
                }
            })
            .then(response => {
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
