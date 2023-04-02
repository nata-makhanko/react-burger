import { _apiBase } from "../api";
import { requestWithToken } from "../../utils/request";
import { TBurgerIngredient, AppThunk, AppDispatch } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';


export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TBurgerIngredient[];
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TBurgerIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction;


export const getIngredients = (): AppThunk => (dispatch: AppDispatch) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        requestWithToken(`${_apiBase}/ingredients`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((res: {data: TBurgerIngredient[]}) => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
            });
        })
}
