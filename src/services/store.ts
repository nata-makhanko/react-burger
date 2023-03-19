import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import {socketMiddleware} from './middleware/socket-middleware';
import * as wsActions from './actions/ws-action-types';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wsActions)))
  export const store = createStore(rootReducer, enhancer);