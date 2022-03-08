import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START_ORDERS,
  } from '../actions/wsActionTypes';
  import { TActions, TActionsCreators, IWsMessage } from '../../utils/types';
  import * as wsActions from '../actions/actionsWs';
  
  export type TWsState = {
    wsConnected: boolean;
    messages: IWsMessage[];
  }

  const initialState: TWsState = {
    wsConnected: false,
    messages: [],
  };

  export type TWsAction = TActions<TActionsCreators<typeof wsActions>>;
  
  export const wsReducer = (state = initialState, action: TWsAction): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_START || WS_CONNECTION_START_ORDERS:
          return {
            ...state
          };  
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
        return {
          ...state,
          messages: state.messages.length ? [...state.messages, { ...action.message }] : [{ ...action.message }]
        };
  
      default:
        return state;
    }
  };