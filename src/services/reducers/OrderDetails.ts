import {
    POST_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED
} from '../actions/OrderDetails';

const initialState = {
    orderRequest: false,
    orderFailed: false,
    orderSuccess: false,
    number: null,
    sum: null
}

export const orderReducer = (state = initialState, action: any) => {
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
/*
export const sumOrderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return { 
                ...state,
                sum: action.payload.reduce((sum: any, current: any) => sum + current.price, 0)
            };
        }
        case DELETE_INGREDIENT: {
            return initialState;
        }
        default: {
            return state
        }
  }
};*/