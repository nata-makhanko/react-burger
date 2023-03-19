import { combineReducers } from 'redux';

import { ingredientsReducer } from './burger-ingredients';
import { dropConstructorReducer } from './drop-constructor';
import { orderDetailsReducer } from './order-details';
import { recoveryPasswordReducer } from './recovery-password';
import { authReducer } from './auth';
import { wsReducer } from './ws-reducer';

export const rootReducer = combineReducers({
    burgerIngredients: ingredientsReducer,
    dropConstructor: dropConstructorReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
    recoveryPassword: recoveryPasswordReducer,
    ws: wsReducer,
});
