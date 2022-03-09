import { Middleware } from "redux";
import { TAppState, TAppAction } from '../services/reducers';
import { AppDispatch } from '../utils/types';
import { TWsActions, WS_SEND_MESSAGE } from '../services/actions/wsActionTypes';
import { wsGetMessage } from '../services/actions/actionsWs';
import { WS_URL, WS_USER_URL } from '../utils/constants';

export const socketMiddleware = (wsActions: TWsActions): Middleware<{}, TAppState> => {
    return (store => {
      let socket: WebSocket | null = null;

    return (next: AppDispatch) => (action: TAppAction) => {
      const { wsInit, wsInitOrders, onOpen, onClose, onError } = wsActions;
      const { dispatch, getState } = store;
      const { authorized, accessToken } = getState().user;
 
      if (action.type === wsInit) {
        socket = new WebSocket(WS_URL);
      }

      if (action.type === wsInitOrders && authorized && accessToken) {
        socket = new WebSocket(`${WS_USER_URL}?token=${accessToken.replace("Bearer","").trim()}`);
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
            const { success, ...restParsedData } = parsedData;
          
            dispatch(wsGetMessage(success, restParsedData));
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
        };

        if (action.type === WS_SEND_MESSAGE && accessToken) {
            action.message.token = accessToken.replace("Bearer","").trim();
            const message = action.message;
            socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    });
};