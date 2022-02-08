import {
    POST_PASSWORD_REQUEST,
    GET_RESTORE_EMAIL_SUCCESS,
    FAILED,
    SET_NEW_PASSWORD_SUCCESS
} from '../actions/PasswordReset';

const initialState = {
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,
}

export const passwordResetReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case POST_PASSWORD_REQUEST: {
          return {
              ...state,
              resetPasswordRequest: true,
              resetPasswordSuccess: false,
              resetPasswordFailed: false,
          };
        }
        case GET_RESTORE_EMAIL_SUCCESS || SET_NEW_PASSWORD_SUCCESS: {
          return { 
              ...state,
              resetPasswordSuccess: action.success,
              resetPasswordRequest: false,
          };
        }
        case FAILED: {
          return { 
              ...state,
              resetPasswordRequest: false,
              resetPasswordSuccess: false,
              resetPasswordFailed: true,
          };
        }
            default: {
                return state
            }
      }
};