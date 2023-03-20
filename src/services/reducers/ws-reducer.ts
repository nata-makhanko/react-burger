import { TWsMessage } from '../../utils/types';
import type {TWsTypesActions} from '../actions/ws-action-types';
import {
  WS_CONNECTION_SUCCESS, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_CLOSED, 
  WS_GET_MESSAGE,
  WS_CONNECTION_SUCCESS_USER, 
  WS_CONNECTION_ERROR_USER, 
  WS_CONNECTION_CLOSED_USER, 
  WS_GET_MESSAGE_USER} from '../actions/ws-action-types';

type TWsReducerState = {
    wsConnected: boolean,
    messages: TWsMessage[],
    wsConnectedUser: boolean,
    userMessages: TWsMessage[],
    error?: Event
}

const initialState: TWsReducerState = {
    wsConnected: false,
    messages: [],
    wsConnectedUser: false,
    userMessages: []
};

export const wsReducer = (state = initialState, action: TWsTypesActions): TWsReducerState => {
    switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
                error: undefined,
        wsConnected: false,
        messages: [],
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [action.payload]
      };
    case WS_CONNECTION_SUCCESS_USER:
        return {
          ...state,
          error: undefined,
          wsConnectedUser: true
        };
      case WS_CONNECTION_ERROR_USER:
        return {
          ...state,
          error: action.payload,
          wsConnectedUser: false
        };
      case WS_CONNECTION_CLOSED_USER:
        return {
          ...state,
        error: undefined,
        wsConnectedUser: false,
        userMessages: [],
        };
      case WS_GET_MESSAGE_USER:
        return {
          ...state,
          error: undefined,
          userMessages: [action.payload]
        };
    default:
      return state;
  }
}
