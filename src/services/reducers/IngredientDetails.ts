import { OPEN_MODAL_DETAILS, CLOSE_MODAL_DETAILS } from '../actions/IngredientDetails';

const initialState = {
    openIngredientId: null
}

export const idIngredientReducer = (state = initialState, action: any) => {
    switch (action.type) {
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