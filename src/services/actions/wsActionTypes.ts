
export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_START_ORDERS = 'WS_CONNECTION_START_ORDERS';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export type TWsActions = {
    wsInit: string,
    wsSendMessage: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string,
    wsInitOrders: string,
};

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsInitOrders: WS_CONNECTION_START_ORDERS,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};