import type { Middleware, MiddlewareAPI } from 'redux';
import type { TApplicationActions, AppDispatch, RootState } from '../../utils/types';
import {TWSActionNames} from '../actions/ws-action-types';

export const socketMiddleware = (wsActions: TWSActionNames): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
    return next => (action: TApplicationActions) => {
      const { dispatch } = store;

      if (action.type === wsActions.WS_CONNECTION_START) {
            // объект класса WebSocket
        socket = new WebSocket(action.payload);
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: wsActions.WS_CONNECTION_SUCCESS, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: wsActions.WS_CONNECTION_ERROR, payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsActions.WS_GET_MESSAGE, payload: parsedData });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: wsActions.WS_CONNECTION_CLOSED, payload: event });
        };

      }

      next(action);
    };
    }) as Middleware;
}; 

// export const socketMiddleware = (wsUrl: string): Middleware => {
//   return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//       let socket: WebSocket | null = null;
//       console.log(wsUrl);
//   return next => (action: TApplicationActions) => {
//     const { dispatch } = store;
//     const { type } = action;


//     if (type === 'WS_CONNECTION_START') {
//           // объект класса WebSocket
//       socket = new WebSocket(wsUrl);
//     }
//     if (socket) {

//               // функция, которая вызывается при открытии сокета
//       socket.onopen = event => {
//         dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
//       };

//               // функция, которая вызывается при ошибке соединения
//       socket.onerror = event => {
//         dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
//       };

//               // функция, которая вызывается при получения события от сервера
//       socket.onmessage = event => {
//         const { data } = event;
//         const parsedData = JSON.parse(data);
//         dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
//       };
//               // функция, которая вызывается при закрытии соединения
//       socket.onclose = event => {
//         dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
//       };

//     }

//     next(action);
//   };
//   }) as Middleware;
// }; 