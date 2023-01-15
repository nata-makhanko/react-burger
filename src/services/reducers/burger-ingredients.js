import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, SELECTED_INGREDIENT, DELETE_SELECTED_INGREDIENT } from "../actions/burger-ingredients";
const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: [],

    selectedIngredient: [],
    isOpenModalIngredient: false,

    countIngredient: 0,
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients,
            };
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            };
        case SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredient: state.ingredients.filter(ingredient => ingredient._id === action.id),
                isOpenModalIngredient: true,
            }
        case DELETE_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredient: {},
                isOpenModalIngredient: false,
            }
        default:
            return state;
    }
}



