import { BASE_URL } from '../../utils/constants';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_INGREDIENT_IN_ORDER = 'ADD_INGREDIENT_IN_ORDER';
export const DELETE_INGREDIENT_IN_ORDER = 'DELETE_INGREDIENT_IN_ORDER';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';
export const ADD_INGREDIENT_BUN_IN_ORDER = 'ADD_INGREDIENT_BUN_IN_ORDER';
export const UPDATE_LOCATION_INGREDIENT_IN_ORDER = 'UPDATE_LOCATION_INGREDIENT_IN_ORDER';

export function getIngredients() {
    return function(dispatch: any) { 
      dispatch({
            type: GET_INGREDIENTS_REQUEST
      });
  
      fetch(`${BASE_URL}ingredients`)
      .then(response => {
        if (!response.ok) {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            isIngredientsLodaded: response.success,
            ingredients: response.data
        });
      })
      .catch(error => {
        dispatch({
            type: GET_INGREDIENTS_FAILED
        });
        console.error('There has been a problem with fetch operation:', error);
      });
    }
} 