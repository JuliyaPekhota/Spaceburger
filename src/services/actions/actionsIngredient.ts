import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    UPDATE_LOCATION_INGREDIENT_IN_ORDER,
    DELETE_INGREDIENT_IN_ORDER,
    DELETE_INGREDIENTS,
    OPEN_MODAL_DETAILS,
    CLOSE_MODAL_DETAILS
  } from './index';
import { IIngredient } from '../../utils/types';

export const deleteIngredients = () => ({ type: DELETE_INGREDIENTS }) as const;  
export const actionDeleteIngredientInOrder = (_id: string) => 
({ type: DELETE_INGREDIENT_IN_ORDER, _id }) as const;
export const getIngredientsFailed = () => ({ type: GET_INGREDIENTS_FAILED }) as const;
export const gettingIngredients = () => ({ type: GET_INGREDIENTS_REQUEST }) as const;
export const getIngredientsSuccess = (success: boolean, ingredients: IIngredient[]) => 
  ({ type: GET_INGREDIENTS_SUCCESS, success, ingredients }) as const;

export const actionUpdatedIngredient = (dragIndex: number, hoverIndex: number) => 
({ type: UPDATE_LOCATION_INGREDIENT_IN_ORDER, dragIndex, hoverIndex }) as const;

export const gettingIngredientBun = (type: "ADD_INGREDIENT_BUN_IN_ORDER" | "ADD_INGREDIENT_IN_ORDER", id: string, _id?: string) => 
({ type: type, id, _id }) as const;

export const openModalDetails = (_id: string) => ({ type: OPEN_MODAL_DETAILS, _id }) as const;
export const closeModalDetails = () => ({ type: CLOSE_MODAL_DETAILS }) as const;