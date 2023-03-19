import { TWsMessage } from '../../utils/types';
import type {TWsTypesActions} from '../actions/ws-action-types';
import {WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE} from '../actions/ws-action-types';

type TWsReducerState = {
    wsConnected: boolean,
    messages: TWsMessage[],

    error?: Event
}

const initialState: TWsReducerState = {
    wsConnected: false,
    messages: [],
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
    default:
      return state;
  }
}
