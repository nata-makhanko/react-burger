import type { TDropConstructorActions } from "../actions/drop-constructor";
import {TTypeIngredients, TCountIngredients, TIngredientsConstructor} from '../../utils/types';
import { 
    ADD_INGREDIENT, 
    ADD_BUN, 
    MOVE_INGREDIENT, 
    INCREASE_INGREDIENT, 
    DECREASE_INGREDIENT, 
    DELETE_INGREDIENT, 
    SUM_INGREDIENT, 
    CLEAR_INGREDIENTS_CONSTRUCTOR, 
    CLEAR_INGREDIENTS_COUNT} from "../actions/drop-constructor";


type TDropConstructorState = {
    typeIngredients: readonly TTypeIngredients[],
    ingredientsConstructor: TIngredientsConstructor[] | [],
    countInggredients: TCountIngredients[],
    sumIngredients: number,
}
const initialState: TDropConstructorState = {
    typeIngredients: [{
        types: ['bun'],
        title: 'Выберите булки',
        position: 'top',
        refDrop: 'bunTop'
    }, {
        types: ['main', 'sauce'],
        title: 'Выберите начинку',
        position: 'center',
        refDrop: 'bunCenter'
    }, {
        types: ['bun'],
        title: 'Выберите булки',
        position: 'bottom',
        refDrop: 'bunBottom'
    }],
    ingredientsConstructor: [],
    countInggredients: [],
    sumIngredients: 0,
};

const sumIngredient = (arr: any): number => {
    let sum: number = arr.reduce((acc: number, {type, price}: TIngredientsConstructor): number => {
        if ( type === "bun") {
            return acc + price * 2;
        } else {
            return acc + price;
        }
    }, 0);

    return sum;
}
export const dropConstructorReducer = (state = initialState, action: TDropConstructorActions): TDropConstructorState => {
    switch (action.type) {
        case ADD_BUN:
            return {
                ...state,
                ingredientsConstructor: [...state.ingredientsConstructor.filter(ingredient => ingredient.type !== 'bun'), action.ingredient]
            }
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredientsConstructor: [...state.ingredientsConstructor, action.ingredient],
            }

        case MOVE_INGREDIENT:
            const prevIgredientsConstructor = [...state.ingredientsConstructor];
            prevIgredientsConstructor.splice(action.hoverIndex, 0, prevIgredientsConstructor.splice(action.dragIndex, 1)[0]);
            return {
                ...state,
                ingredientsConstructor: prevIgredientsConstructor,
            }
        case INCREASE_INGREDIENT:
            const hasIngredient = state.countInggredients.some(ingredient => ingredient._id === action.ingredient._id);
            const isBun = action.ingredient.type === 'bun';
            if (hasIngredient && isBun) {
                return {
                    ...state,
                    countInggredients: [...state.countInggredients]
                }
            } else if (!hasIngredient && isBun) {
                const arrWithoutBuns = state.countInggredients.filter(ingredient => {
                    if (ingredient.type !== 'bun') {
                        return ingredient;
                    } 
                })
                return {
                    ...state,
                    countInggredients: [...arrWithoutBuns, { ...action.ingredient, count: 2 }]
                }
            } else if (hasIngredient && !isBun) {
                const newArr = state.countInggredients.map(ingredient => {
                    if (ingredient._id === action.ingredient._id && ingredient.count) {
                        ingredient.count++;
                        return ingredient;
                    }
                    return ingredient;
                })
                return {
                    ...state,
                    countInggredients: newArr,
                }
            }
            return {
                ...state,
                countInggredients: [...state.countInggredients, { ...action.ingredient, count: 1 }]
            };
        case DECREASE_INGREDIENT:
            let decreaseArr = state.countInggredients.map(ingredient => {
                if (ingredient._id === action._id && ingredient.count) {
                    ingredient.count--;
                    return ingredient;
                }
                return ingredient;
            })
            return {
                ...state,
                countInggredients: decreaseArr,
            }
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredientsConstructor: state.ingredientsConstructor.filter(ingredient => ingredient.uuid !== action.uuid),
            }
        case SUM_INGREDIENT:
            return {
                ...state,
                sumIngredients: sumIngredient(state.ingredientsConstructor),
            }
        case CLEAR_INGREDIENTS_CONSTRUCTOR:
            return {
                ...state,
                ingredientsConstructor: [],
            }
        case CLEAR_INGREDIENTS_COUNT:
            return {
                ...state,
                countInggredients: [],
            }
        default:
            return state;
    }
};

