import { BASE_URL } from '../../utils/constants';
import * as orderActions from './actionsOrderDetails';
import { deleteIngredients } from './actionsIngredient';
import { AppDispatch } from '../../utils/types';

export const GET_ORDER = 'GET_ORDER';
export const POST_ORDER_NUMBER_REQUEST = 'POST_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export function getOrderNumber(ids: Array<string>, token: string) {
    return function(dispatch: AppDispatch) { 
      dispatch(orderActions.postingOrderNumber());
  
      fetch(`${BASE_URL}orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({"ingredients": ids})
      })
      .then(response => {
        if (!response.ok) {
          dispatch(orderActions.getOrderNumberFailed());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch(orderActions.getOrderNumberSuccess(response.success, response.order.number));
        dispatch(deleteIngredients()); 
      })
      .catch(error => {
        dispatch(orderActions.getOrderNumberFailed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}