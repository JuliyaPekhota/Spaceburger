import {
    POST_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED
} from '../actions/OrderDetails';
import * as orderActions from '../actions/actionsOrderDetails';
import { TActions, TActionsCreators } from '../../utils/types';

export type TOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderSuccess: boolean;
  number: string | null;
}

const initialState: TOrderState = {
    orderRequest: false,
    orderFailed: false,
    orderSuccess: false,
    number: null
}

export type TOrderAction = TActions<TActionsCreators<typeof orderActions>>;

export const orderReducer = (state = initialState, action: TOrderAction): TOrderState => {
    switch (action.type) {
        case POST_ORDER_NUMBER_REQUEST: {
          return {
              ...state,
              orderRequest: true,
              orderSuccess: false,
              orderFailed: false,
          };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
          return { 
              ...state, 
              number: action.value,
              orderSuccess: action.success,
              orderRequest: false,
          };
        }
        case GET_ORDER_NUMBER_FAILED: {
          return { 
              ...state,
              orderRequest: false,
              orderSuccess: false,
              orderFailed: true,
          };
        }
        default: {
          return state
        }
      }
};