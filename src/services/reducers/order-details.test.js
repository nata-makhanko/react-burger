import { orderDetailsReducer } from "./order-details";
import * as types from '../actions/order-details';

const initialState = {
    orderDetailsRequest: false,
    orderDetailsFailed: false,
    orderDetails: {},
    isLoading: false,
    isOpenModalOrder: false,
    orderNumber: 0,
    orderListRequest: false,
    orderListFailed: false,
    orderList: [],
    isLoadedOrderList: false,
}

const getOrderDetailsSuccess = {
    success: true,
    name: 'Сочный, мощный бургер',
    order: {
        ingredients: [
            {
                _id: '34343',
                name: 'Крутая булка',
                type: 'bun',
                proteins: 23,
                fat: 565,
                carbohydrates: 324,
                calories: 8787,
                price: 43,
                image: '',
                image_mobile: '',
                image_large: 'string',
                __v: 565,
            }
        ],
        _id: '2322',
        status: 'success',
        name: 'Сочный, мощный бургер',
        createdAt: '23232',
        updatedAt: '2322',
        number: 4544,
        price: 455554,
    }
}

const gerOrderListSuccess = [{
    createdAt: '3433',
    ingredients: ['233233', '23234455667'],
    name: 'Веселый бургер',
    number: 43453454,
    owner: 'Кто очень веселый',
    status: 'success',
    updatedAt: '34435454',
    __v: 34456665,
    _id: '3456789',
}]

describe('order detailse reducer', () => {
    it('should return the initial state', () => {
        expect(orderDetailsReducer(undefined, {})).toEqual(initialState)
    })

    it('case GET_ORDER_DETAILS_REQUEST', () => {
        expect(orderDetailsReducer(initialState, {
            type: types.GET_ORDER_DETAILS_REQUEST
        })).toEqual({
            ...initialState,
            orderDetailsRequest: true,
            orderDetailsFailed: false,
            isLoading: true,
        })
    })

    it('case GET_ORDER_DETAILS_SUCCESS', () => {
        expect(orderDetailsReducer(initialState, {
            type: types.GET_ORDER_DETAILS_SUCCESS,
            orderDetails: getOrderDetailsSuccess,
        })).toEqual({
            ...initialState,
            orderDetailsRequest: false,
            orderDetailsFailed: false,
            orderDetails: getOrderDetailsSuccess,
            isLoading: false,
        })
    })

    it('case GET_ORDER_DETAILS_FAILED', () => {
        expect(orderDetailsReducer(initialState, {
            type: types.GET_ORDER_DETAILS_FAILED
        })).toEqual({
            ...initialState,
            orderDetailsRequest: true,
            orderDetailsFailed: false,
            orderDetails: {},
            isLoading: false,
        })
    })

    it('case SELECTED_ORDET_DETAILS', () => {
        expect(orderDetailsReducer(initialState, {
            type: types.SELECTED_ORDET_DETAILS
        })).toEqual({
            ...initialState,
            isOpenModalOrder: true,
        })
    })

    it('case DELETE_ORDET_DETAILS', () => {
        expect(orderDetailsReducer({
            ...initialState,
            orderDetails: getOrderDetailsSuccess,
            isOpenModalOrder: true,
            orderNumber: 35446
        }, {
            type: types.DELETE_ORDET_DETAILS
        })).toEqual({
            ...initialState,
            orderDetails: {},
            isOpenModalOrder: false,
            orderNumber: 0,
        })
    })

    it('case GET_ORDER_LIST_REQUEST', () => {
        expect(orderDetailsReducer(initialState, {
            type: types.GET_ORDER_LIST_REQUEST
        })).toEqual({
            ...initialState,
            orderListRequest: true,
        })
    })

    it('case GET_ORDER_LIST_SUCCESS', () => {
        expect(orderDetailsReducer(initialState, {
            type: types.GET_ORDER_LIST_SUCCESS,
            orderList: gerOrderListSuccess,
        })).toEqual({
            ...initialState,
            orderListRequest: false,
            orderList: gerOrderListSuccess,
            isLoadedOrderList: true,
        })
    })

    it('case GET_ORDER_LIST_FAILED', () => {
        expect(orderDetailsReducer(initialState, {
            type: types.GET_ORDER_LIST_FAILED,
        })).toEqual({
            ...initialState,
            orderListRequest: false,
            orderListFailed: true,
            isLoadedOrderList: false,
        })
    })
})