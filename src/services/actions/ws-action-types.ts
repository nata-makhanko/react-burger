import {TWsMessage} from '../../utils/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';


export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    payload : string;
}
export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    payload: Event;
}
export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: Event;
}
export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    payload: TWsMessage;
}

export type TWsTypesActions = 
    | IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction;

export type TWSActionNames = {
        [key in TWsTypesActions['type']] : key
}


