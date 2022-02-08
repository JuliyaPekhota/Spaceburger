import {
    POST_LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT,
    POST_UPDATE_TOKEN,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED,
    GET_INFO_USER,
    GET_INFO_SUCCESS,
    GET_INFO_FAILED,
    PATCH_INFO_USER,
    INIT_USER,
    AUTHORIZED
} from '../actions/UserAuth';
import { IRegistryUser } from '../../utils/types';

const initialState = {
    loginRequest: false,
    loginFailed: false,
    loginSuccess: false,

    logoutRequest: false,
    logoutFailed: false,
    logoutSuccess: false,

    tokenRequest: false,
    tokenFailed: false,
    tokenSuccess: false,

    getUserInfoRequest: false,
    getUserInfoFailed: false,
    getUserInfoSuccess: false,

    accessToken: undefined,
    refreshToken: undefined,
    
    authorized: false,
    user: JSON.parse(localStorage.getItem("user") ?? "null") as IRegistryUser || {}
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case AUTHORIZED: {
          return state;
        }
        case INIT_USER: {
          return {
            ...state,
            authorized: true,
          }  
        }
        case POST_LOGIN_USER: {
          return {
              ...state,
              loginRequest: true,
              loginSuccess: false,
              loginFailed: false,
          };
        }
        case LOGIN_USER_SUCCESS: {
            const tokens = {"refreshToken": action.refreshToken, "accessToken": action.accessToken};
            localStorage.setItem('tokens', JSON.stringify(tokens));
            localStorage.setItem('user', JSON.stringify({"email": action.user?.email, "name": action.user?.name}));
            
            return { 
              ...state,
              accessToken: action.accessToken,
              refreshToken: action.refreshToken,
              loginSuccess: action.success,
              user: action.user,
              loginRequest: false,

              authorized: true,
          };
        }
        case LOGOUT: {
            localStorage.clear();
            return { 
                ...state,
                logoutSuccess: action.success,
                logoutRequest: false,
                user: void 0,
  
                authorized: false,
            };
          }
        case LOGIN_USER_FAILED: {
          return { 
              ...state,
              loginRequest: false,
              loginSuccess: false,
              loginFailed: true,
          };
        }
        case POST_UPDATE_TOKEN: {
            return {
                ...state,
                tokenRequest: true,
                tokenSuccess: false,
                tokenFailed: false,
            };
          }
          case UPDATE_TOKEN_SUCCESS: {
            const tokens = {"refreshToken": action.refreshToken, "accessToken": action.accessToken};
            localStorage.setItem('tokens', JSON.stringify(tokens));
            localStorage.setItem('user', JSON.stringify({"email": action.user?.email, "name": action.user?.name}));
            return { 
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                tokenSuccess: action.success,
                tokenRequest: false,
            };
          }
          case UPDATE_TOKEN_FAILED: {
            return { 
                ...state,
                tokenRequest: false,
                tokenSuccess: false,
                tokenFailed: true,
            };
          }
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
                user: action.user,
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