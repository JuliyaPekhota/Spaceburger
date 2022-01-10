import { BASE_URL } from '../../utils/constants';
import { DELETE_INGREDIENTS } from '../actions/';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const POST_ORDER_NUMBER_REQUEST = 'POST_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export function getOrderNumber(ids: Array<string>) {
    return function(dispatch: any) { 
      dispatch({
            type: POST_ORDER_NUMBER_REQUEST
      });
  
      fetch(`${BASE_URL}orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ingredients": ids})
      })
      .then(response => {
        if (!response.ok) {
          dispatch({
            type: GET_ORDER_NUMBER_FAILED
          });
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            value: response.order.number,
            success: response.success
        });
        dispatch({
          type: DELETE_INGREDIENTS,
        });  
      })
      .catch(error => {
        dispatch({
            type: GET_ORDER_NUMBER_FAILED
        });
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}