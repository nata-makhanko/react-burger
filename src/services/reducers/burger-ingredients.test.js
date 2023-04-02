import { ingredientsReducer, initialState } from "./burger-ingredients";
import * as types from '../actions/burger-ingredients';


const burgerIngredients = [
    {
        _id: '1234',
        name: 'Salad',
        type: 'ingredient',
        proteins: 2,
        fat: 1,
        carbohydrates: 12,
        calories: 43,
        price: 122,
        image: 'https://salad.ru',
        image_mobile: 'https://mobile.salad.ru',
        image_large: 'https://large.salad.ru',
        __v: 0,
    },
    {
        _id: '1234',
        name: 'Bun',
        type: 'bun',
        proteins: 12,
        fat: 122,
        carbohydrates: 126,
        calories: 93,
        price: 887,
        image: 'https://bun.ru',
        image_mobile: 'https://mobile.bun.ru',
        image_large: 'https://large.bun.ru',
        __v: 3,
    },
];


describe('burger ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('case GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(initialState, {
            type: types.GET_INGREDIENTS_REQUEST
        })).toEqual({
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false,
            isLoadedIngredients: false,
        })
    })

    it('case GET_INGREDIENTS_SUCCESS', () => {
        expect(ingredientsReducer({
            ...initialState,
            ingredientsRequest: true,
        }, {
            type: types.GET_INGREDIENTS_SUCCESS,
            ingredients: burgerIngredients,
        })).toEqual({
            ingredientsRequest: false,
            ingredientsFailed: false,
            ingredients: burgerIngredients,
            isLoadedIngredients: true,
        })
    })

    it('case GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer({
            ...initialState,
            ingredientsRequest: true,
        }, {
            type: types.GET_INGREDIENTS_FAILED
        })).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true,
            isLoadedIngredients: false,
        })
    })
})