import { store } from "../services/store";
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import type {TBurgerIngredientsActions } from '../services/actions/burger-ingredients';
import type { TDropConstructorActions } from "../services/actions/drop-constructor";
import type {TOrderDetailsActions} from '../services/actions/order-details';
import type {TRecoveryPasswordActions} from '../services/actions/recovery-password';
import type {TAuthActions} from '../services/actions/auth';
import type {TWsTypesActions} from '../services/actions/ws-action-types';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions = 
    | TBurgerIngredientsActions
    | TDropConstructorActions
    | TOrderDetailsActions
    | TRecoveryPasswordActions
    | TAuthActions
    | TWsTypesActions; 

// Типизация thunk'ов
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, never, TApplicationActions>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
// export type AppDispatch = typeof store.dispatch;

export type TBurgerIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
};

export type TBurgerConstructor = TBurgerIngredient & {
    uuid: string,
}

export type TCountIngredients = {
    type: string,
    _id: string,
    count: number
}

export type TIngredientsConstructor = {
    _id: string,
    uuid: string,
    name: string,
    price: number,
    image_mobile: string,
    type: string,
}

export type TTypeIngredients = {
    types: string[],
    title: string,
    position: string,
    refDrop: string
}

export type TOrder = {
    ingredients: TBurgerIngredient[],
    _id: string,
    owner?: {
        name: string,
        email: string,
        createAt: string,
        updateAt: string,
    },
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    price?: number,
}

export type TOrderList = {
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    owner: string,
    status: string,
    updatedAt: string,
    __v: number,
    _id: string,
}

export type TOrderDetails = {
    success?: boolean,
    name?: string,
    order?: TOrder,
}

export type TUser = {
    email: string,
    name: string,
}

export type TWsMessageOrders = {
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
    name: string,
}

export type TWsMessage = {
        success: boolean,
        orders: TWsMessageOrders[],
        total: number,
        totalToday: number
}

export type TSelectedOrderIngredients = TBurgerIngredient & {
    count: number;
}