import { GET_ORDER, POST_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS, GET_ORDER_NUMBER_FAILED } from './OrderDetails';

export const getOrder = (ingredientIds: Array<string>) => ({ type: GET_ORDER, ingredientIds }) as const;

export const postingOrderNumber = () => ({ type: POST_ORDER_NUMBER_REQUEST }) as const;
export const getOrderNumberFailed = () => ({ type: GET_ORDER_NUMBER_FAILED }) as const;
export const getOrderNumberSuccess = (success: boolean, value: string) => 
  ({ type: GET_ORDER_NUMBER_SUCCESS, success, value }) as const;