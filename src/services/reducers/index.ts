
import { combineReducers } from 'redux';
import { orderReducer, TOrderState, TOrderAction } from './OrderDetails';
import { userReducer, TUserState, TUserAction } from './User';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    DELETE_INGREDIENTS,
    ADD_INGREDIENT_IN_ORDER,
    DELETE_INGREDIENT_IN_ORDER,
    ADD_INGREDIENT_BUN_IN_ORDER,
    UPDATE_LOCATION_INGREDIENT_IN_ORDER,
    CLOSE_MODAL_DETAILS,
    OPEN_MODAL_DETAILS
} from '../actions';
import update from 'immutability-helper';
import { IIngredient, TActions, TActionsCreators } from '../../utils/types';
import * as ingredientActions from '../actions/actionsIngredient';
import { TWsState, wsReducer, TWsAction } from './wsReducer';

type TIngredientState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsSuccess: boolean;
  openIngredientId: string | null;
  ingredients: IIngredient[];
  ingredientsInOrder: IIngredient[];
};

const initialState: TIngredientState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsSuccess: false,

    openIngredientId: null,

    ingredients: [],
    ingredientsInOrder: [],
}

type TIngredientAction = TActions<TActionsCreators<typeof ingredientActions>>;

export const ingredientsReducer = (state = initialState, action: TIngredientAction): TIngredientState => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
        return {
            ...state,
            ingredientsRequest: true,
            ingredientsFailed: false,
            ingredientsSuccess: false
        };
      }
      case GET_INGREDIENTS_SUCCESS: {
        return { 
            ...state, 
            ingredients: action.ingredients, 
            ingredientsSuccess: true,
            ingredientsRequest: false, 
        };
      }
      case GET_INGREDIENTS_FAILED: {
        return { 
            ...state, 
            ingredientsSuccess: false,
            ingredientsRequest: false,
            ingredientsFailed: true,
        };
      }
      case ADD_INGREDIENT_IN_ORDER: {
        return {
          ...state,
          ingredientsInOrder: [
            ...state.ingredientsInOrder,
            ...state.ingredients.filter(item => item._id === action._id).map(item => item ? {...item, id: action.id } : item),
          ],
        };
      }
      case ADD_INGREDIENT_BUN_IN_ORDER: {
        return {
          ...state,
          ingredientsInOrder: [
            ...state.ingredientsInOrder.filter(item => item.type !== 'bun'),
            ...state.ingredients.filter(item => item._id === action._id),
          ]
        };
      }
      case DELETE_INGREDIENT_IN_ORDER: {
        return { 
          ...state, 
          ingredientsInOrder: [...state.ingredientsInOrder].filter((value, index, array) => index !== array.findIndex((i) => i._id === action._id)),
        };
      }
      case DELETE_INGREDIENTS: {
        return { 
          ...state, 
          ingredientsInOrder: [],
        };
      }
      case UPDATE_LOCATION_INGREDIENT_IN_ORDER: {
        return { 
          ...state, 
          ingredientsInOrder: update(state.ingredientsInOrder, {
            $splice: [
              [action.dragIndex, 1],
              [action.hoverIndex, 0, state.ingredientsInOrder[action.dragIndex]],
            ],
          }),
        };
      }
      case OPEN_MODAL_DETAILS: {
        return {
            ...state,
            openIngredientId: action._id,
        };
      }
      case CLOSE_MODAL_DETAILS: {
        return { 
            ...state,
            openIngredientId: state.openIngredientId = null,
        };
      }
      default: {
        return state
      }
    }
};

export type TAppState = {
  ingredient: TIngredientState,
  order: TOrderState,
  user: TUserState,
  ws: TWsState,
}

export type TAppAction = TUserAction | TOrderAction | TIngredientAction | TWsAction;
  
export const rootReducer = combineReducers<TAppState>({
    ingredient: ingredientsReducer,
    order: orderReducer,
    user: userReducer,
    ws: wsReducer,
});
