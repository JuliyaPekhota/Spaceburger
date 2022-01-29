import {
    POST_REGISTRY_USER,
    REGISTRY_USER_SUCCESS,
    REGISTRY_USER_FAILED
} from '../actions/Register';

const initialState = {
    registerRequest: false,
    registerFailed: false,
    registerSuccess: false,
    accessToken: undefined,
    refreshToken: undefined,
}

export const registerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case POST_REGISTRY_USER: {
          return {
              ...state,
              registerRequest: true,
              registerSuccess: false,
              registerFailed: false,
          };
        }
        case REGISTRY_USER_SUCCESS: {
          return { 
              ...state,
              accessToken: action.accessToken,
              refreshToken: action.refreshToken,
              registerSuccess: action.success,
              registerRequest: false
          };
        }
        case REGISTRY_USER_FAILED: {
          return { 
              ...state,
              registerRequest: false,
              registerSuccess: false,
              registerFailed: true,
          };
        }
            default: {
                return state
            }
      }
};