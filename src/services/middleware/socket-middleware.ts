import type { Middleware, MiddlewareAPI } from 'redux';
import type { TApplicationActions, AppDispatch, RootState } from '../../utils/types';
import {TWSActionNames} from '../actions/ws-action-types';

export const socketMiddleware = (wsActions: TWSActionNames): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (action.type === wsInit) {
            // объект класса WebSocket
        socket = new WebSocket(action.payload);
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

      }

      next(action);
    };
    }) as Middleware;
}; 
