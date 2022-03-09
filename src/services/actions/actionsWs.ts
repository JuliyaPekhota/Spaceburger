import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CONNECTION_START,
    WS_CONNECTION_START_ORDERS,
  } from './wsActionTypes';
  import { IWsMessage } from '../../utils/types';
  
  export const wsInit = () => ({ type: WS_CONNECTION_START }) as const;
  export const wsInitOrders = () => ({ type: WS_CONNECTION_START_ORDERS }) as const;
  export const wsConnectionSuccess = () => ({ type: WS_CONNECTION_SUCCESS }) as const;
  export const wsConnectionError = () => ({ type: WS_CONNECTION_ERROR }) as const;
  export const wsConnectionClosed = () => ({ type: WS_CONNECTION_CLOSED }) as const;
  export const wsGetMessage = (success: boolean, message: IWsMessage) => ({ type: WS_GET_MESSAGE, message, success }) as const;
  export const wsSendMessage = (message: IWsMessage) => ({ type: WS_SEND_MESSAGE, message }) as const;
