import {TWsMessage} from '../../utils/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export const WS_CONNECTION_START_USER: 'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS_USER: 'WS_CONNECTION_SUCCESS_USER' = 'WS_CONNECTION_SUCCESS_USER';
export const WS_CONNECTION_CLOSED_USER: 'WS_CONNECTION_CLOSED_USER' = 'WS_CONNECTION_CLOSED_USER';
export const WS_CONNECTION_ERROR_USER: 'WS_CONNECTION_ERROR_USER' = 'WS_CONNECTION_ERROR_USER';
export const WS_GET_MESSAGE_USER: 'WS_GET_MESSAGE_USER' = 'WS_GET_MESSAGE_USER';


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

export interface IWsConnectionStartUserAction {
    readonly type: typeof WS_CONNECTION_START_USER;
    payload : string;
}
export interface IWsConnectionSuccessUserAction {
    readonly type: typeof WS_CONNECTION_SUCCESS_USER;
    payload: Event;
}
export interface IWsConnectionErrorUserAction {
    readonly type: typeof WS_CONNECTION_ERROR_USER;
    payload: Event;
}
export interface IWsConnectionClosedUserAction {
    readonly type: typeof WS_CONNECTION_CLOSED_USER;
}
export interface IWsGetMessageUserAction {
    readonly type: typeof WS_GET_MESSAGE_USER;
    payload: TWsMessage;
}

export type TWsTypesActions = 
    | IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    | IWsConnectionStartUserAction
    | IWsConnectionSuccessUserAction
    | IWsConnectionErrorUserAction
    | IWsConnectionClosedUserAction
    | IWsGetMessageUserAction;


export type TWSActionNames = {
    wsInit: 'WS_CONNECTION_START' | 'WS_CONNECTION_START_USER',
    onOpen: 'WS_CONNECTION_SUCCESS' | 'WS_CONNECTION_SUCCESS_USER',
    onClose: 'WS_CONNECTION_CLOSED' | 'WS_CONNECTION_CLOSED_USER',
    onError: 'WS_CONNECTION_ERROR' | 'WS_CONNECTION_ERROR_USER',
    onMessage: 'WS_GET_MESSAGE' | 'WS_GET_MESSAGE_USER',
}



