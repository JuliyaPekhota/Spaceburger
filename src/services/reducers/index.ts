import { combineReducers } from 'redux';
import { idIngredientReducer } from './IngredientDetails';
import { orderReducer } from './OrderDetails';
import { passwordResetReducer } from './PasswordReset';
import { registerReducer } from './Register';
import { userInfoReducer } from './UserInfo'
import { userReducer } from './UserAuth';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    DELETE_INGREDIENTS,
    ADD_INGREDIENT_IN_ORDER,
    DELETE_INGREDIENT_IN_ORDER,
    ADD_INGREDIENT_BUN_IN_ORDER,
    UPDATE_LOCATION_INGREDIENT_IN_ORDER
} from '../actions';
import update from 'immutability-helper';

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsSuccess: false,

    ingredients: [] as any[],
    ingredientsInOrder: [] as any[],
}

export const ingredientsReducer = (state = initialState, action: any) => {
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
            ingredientsSuccess: action.isIngredientsLodaded,
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
            ...state.ingredients.filter(item => item._id === action._id).map((item: any) => item ? {...item, id: action.id } : item),
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
          default: {
              return state
          }
    }
};
  
export const rootReducer = combineReducers({
    ingredient: ingredientsReducer,
    idOpenIngredient: idIngredientReducer,
    order: orderReducer,
    passwordReset: passwordResetReducer,
    register: registerReducer,
    userInfo: userInfoReducer,
    user: userReducer,
});
