import { BASE_URL } from '../../utils/constants';
import { AppDispatch } from '../../utils/types';
import * as ingredientAction from './actionsIngredient';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_INGREDIENT_IN_ORDER = 'ADD_INGREDIENT_IN_ORDER';
export const DELETE_INGREDIENT_IN_ORDER = 'DELETE_INGREDIENT_IN_ORDER';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';
export const ADD_INGREDIENT_BUN_IN_ORDER = 'ADD_INGREDIENT_BUN_IN_ORDER';
export const UPDATE_LOCATION_INGREDIENT_IN_ORDER = 'UPDATE_LOCATION_INGREDIENT_IN_ORDER';

export const OPEN_MODAL_DETAILS = 'OPEN_MODAL_DETAILS';
export const CLOSE_MODAL_DETAILS = 'CLOSE_MODAL_DETAILS';

export function getIngredients() {
    return function(dispatch: AppDispatch) { 
      dispatch(ingredientAction.gettingIngredients());
  
      fetch(`${BASE_URL}ingredients`)
      .then(response => {
        if (!response.ok) {
          dispatch(ingredientAction.getIngredientsFailed());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch(ingredientAction.getIngredientsSuccess(response.success, response.data));
      })
      .catch(error => {
        dispatch(ingredientAction.getIngredientsFailed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}
