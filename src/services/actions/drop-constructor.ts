import { TIngredientsConstructor } from "../../utils/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';

export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export const INCREASE_INGREDIENT: 'INCREASE_INGREDIENT' = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT: 'DECREASE_INGREDIENT' = 'DECREASE_INGREDIENT';

export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';

export const SUM_INGREDIENT: 'SUM_INGREDIENT' = 'SUM_INGREDIENT';

export const CLEAR_INGREDIENTS_CONSTRUCTOR: 'CLEAR_INGREDIENTS_CONSTRUCTOR' = 'CLEAR_INGREDIENTS_CONSTRUCTOR';
export const CLEAR_INGREDIENTS_COUNT: 'CLEAR_INGREDIENTS_COUNT' = 'CLEAR_INGREDIENTS_COUNT';

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    ingredient: TIngredientsConstructor;
}
export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    ingredient: TIngredientsConstructor;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly hoverIndex: number;
    readonly dragIndex: number;

}

export interface IIncreaseIngredientAction {
    readonly type: typeof INCREASE_INGREDIENT;
    ingredient: {type: string, _id: string}
}
export interface IDecreaseIngredientAction {
    readonly type: typeof DECREASE_INGREDIENT;
    _id: string;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly uuid: string;
}

export interface ISumIngredientAction {
    readonly type: typeof SUM_INGREDIENT;
}

export interface IClearIngredientsConstructorAction {
    readonly type: typeof CLEAR_INGREDIENTS_CONSTRUCTOR;
}
export interface IClearIngredientsCountAction {
    readonly type: typeof CLEAR_INGREDIENTS_COUNT;
}

export type TDropConstructorActions = 
    | IAddIngredientAction
    | IAddBunAction
    | IMoveIngredientAction
    | IIncreaseIngredientAction
    | IDecreaseIngredientAction
    | IDeleteIngredientAction
    | ISumIngredientAction
    | IClearIngredientsConstructorAction
    | IClearIngredientsCountAction;






