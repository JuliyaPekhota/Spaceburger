import { combineReducers } from 'redux';
import { idIngredientReducer } from './IngredientDetails';
import { orderReducer } from './OrderDetails';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_IN_ORDER,
    DELETE_INGREDIENT_IN_ORDER,
    ADD_INGREDIENT_BUN_IN_ORDER,
    UPDATE_LOCATION_INGREDIENT_IN_ORDER
} from '../actions';


const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsSuccess: false,
    ingredients: [] as any[],

    ingredientsDelayed: [] as any[],
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
          ingredientsDelayed: [
            ...state.ingredientsDelayed,
            ...state.ingredients.filter(item => item._id === action._id),
          ]
        };
      }
      case ADD_INGREDIENT_BUN_IN_ORDER: {
        return {
          ...state,
          ingredientsDelayed: [
            ...state.ingredientsDelayed.filter(item => item.type !== 'bun'),
            ...state.ingredients.filter(item => item._id === action._id),
          ]
        };
      }
      case DELETE_INGREDIENT_IN_ORDER: {
        return { 
          ...state, 
          ingredientsDelayed: [...state.ingredientsDelayed].filter((value, index, array) => index !== array.findIndex((i) => i._id === action._id))
        };
      }
     /* case UPDATE_LOCATION_INGREDIENT_IN_ORDER: {
        return { 
          ...state, 
          ingredientsDelayed: update(state.ingredientsDelayed, {
            $splice: [
              [action.dragIndex, 1],
              [action.hoverIndex, 0, state.ingredientsDelayed[action.dragIndex]],
            ],
          }),
        };
      }*/
          default: {
              return state
          }
    }
};
  
export const rootReducer = combineReducers({
    ingredient: ingredientsReducer,
    idOpenIngredient: idIngredientReducer,
    order: orderReducer,
});
