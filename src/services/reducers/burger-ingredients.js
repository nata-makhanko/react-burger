import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../actions/burger-ingredients";
const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    isLoadedIngredients: false,
    ingredients: [],

    countIngredient: 0,
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
                isLoadedIngredients: false,
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients,
                isLoadedIngredients: true,
            };
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                isLoadedIngredients: false,
            };
        default:
            return state;
    }
}



