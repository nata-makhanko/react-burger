import { wsReducer } from "./ws-reducer";
import * as types from '../actions/ws-action-types';

const initialState = {
    wsConnected: false,
    messages: [],
    wsConnectedUser: false,
    userMessages: []
}

const wsConnection = [
    {
        success: true,
        orders: [{
            ingredients: ['89999989889', '9787878788'],
            _id: '344335',
            status: true,
            number: 345465,
            createdAt: '343565',
            updatedAt: '3454545',
            name: '35657',
        }],
        total: 343445,
        totalToday: 23,
    }
]

describe('ws reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    })

    it('case WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, {
            type: types.WS_CONNECTION_SUCCESS,
        })).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true
        })
    })

    it('case WS_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, {
            type: types.WS_CONNECTION_ERROR,
            payload: 'Sm wrong!'
        })).toEqual({
            ...initialState,
            error: 'Sm wrong!',
            wsConnected: false
        })
    })

    it('case WS_CONNECTION_CLOSED', () => {
        expect(wsReducer({
            ...initialState,
            messages: wsConnection
        }, {
            type: types.WS_CONNECTION_CLOSED,
        })).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: false,
            messages: [],
        })
    })

    it('case WS_GET_MESSAGE', () => {
        expect(wsReducer(initialState, {
            type: types.WS_GET_MESSAGE,
            payload: wsConnection
        })).toEqual({
            ...initialState,
            error: undefined,
            messages: [wsConnection]
        })
    })

    it('case WS_CONNECTION_SUCCESS_USER', () => {
        expect(wsReducer(initialState, {
            type: types.WS_CONNECTION_SUCCESS_USER,
        })).toEqual({
            ...initialState,
            error: undefined,
            wsConnectedUser: true
        })
    })

    it('case WS_CONNECTION_ERROR_USER', () => {
        expect(wsReducer(initialState, {
            type: types.WS_CONNECTION_ERROR_USER,
            payload: 'Sm wrong!'
        })).toEqual({
            ...initialState,
            error: 'Sm wrong!',
            wsConnectedUser: false
        })
    })

    it('case WS_CONNECTION_CLOSED_USER', () => {
        expect(wsReducer({
            ...initialState,
            userMessages: wsConnection
        }, {
            type: types.WS_CONNECTION_CLOSED_USER,
        })).toEqual({
            ...initialState,
            error: undefined,
            wsConnectedUser: false,
            userMessages: [],
        })
    })

    it('case WS_GET_MESSAGE_USER', () => {
        expect(wsReducer(initialState, {
            type: types.WS_GET_MESSAGE_USER,
            payload: wsConnection
        })).toEqual({
            ...initialState,
            error: undefined,
            userMessages: [wsConnection]
        })
    })
})