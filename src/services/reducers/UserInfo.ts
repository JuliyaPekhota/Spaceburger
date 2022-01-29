import {
    GET_INFO_USER,
    GET_INFO_SUCCESS,
    GET_INFO_FAILED,
    PATCH_INFO_USER,
} from '../actions/UserInfo';

const initialState = {
    getUserInfoRequest: false,
    getUserInfoFailed: false,
    getUserInfoSuccess: false,
    userEmail: undefined,
    userName: undefined,
}

export const userInfoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_INFO_USER || PATCH_INFO_USER: {
          return {
              ...state,
              getUserInfoRequest: true,
              getUserInfoSuccess: false,
              getUserInfoFailed: false,
          };
        }
        case GET_INFO_SUCCESS: {
          return { 
              ...state,
              userEmail: action.userEmail,
              userName: action.userName,
              getUserInfoSuccess: action.success,
              getUserInfoRequest: false,
          };
        }
        case GET_INFO_FAILED: {
          return { 
              ...state,
              getUserInfoRequest: false,
              getUserInfoSuccess: false,
              getUserInfoFailed: true,
          };
        }
            default: {
                return state
            }
      }
};
