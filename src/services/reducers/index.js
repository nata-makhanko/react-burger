import { combineReducers } from 'redux';

import { ingredientsReducer } from './burger-ingredients';

import { dropConstructorReducer } from './drop-constructor';

import { orderDetailsReducer } from './order-details';


export const rootReducer = combineReducers({
    burgerIngredients: ingredientsReducer,
    dropConstructor: dropConstructorReducer,
    orderDetails: orderDetailsReducer,
});
