import {
    INIT_USER,
    AUTHORIZED,
    POST_LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,

    POST_LOGOUT, LOGOUT_FAILED, LOGOUT_SUCCESS,
    POST_UPDATE_TOKEN, UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_FAILED,
    GET_INFO_USER, GET_INFO_SUCCESS, GET_INFO_FAILED,
    PATCH_INFO_USER, PATCH_INFO_SUCCESS, PATCH_INFO_FAILED,
    POST_REGISTRY_USER, RESPONSE_SUCCESS_REGISTRY, RESPONSE_FAILED_REGISTRY,
    POST_PASSWORD_REQUEST, RESPONSE_FAILED_PASSWORD, RESPONSE_SUCCESS_PASSWORD,
    POST_NEW_PASSWORD_REQUEST, RESPONSE_FAILED_NEW_PASSWORD, RESPONSE_SUCCESS_NEW_PASSWORD
} from '../actions/User';
import * as userActions from '../actions/actionsUser';
import { getAccessToken } from '../../utils/utils';
import { TActions, TActionsCreators, IUser } from '../../utils/types';

export type TUserState = {
  loginRequest: boolean;
  loginFailed: boolean;
  loginSuccess: boolean;

  logoutRequest: boolean;
  logoutFailed: boolean;
  logoutSuccess: boolean;

  tokenRequest: boolean;
  tokenFailed: boolean;
  tokenSuccess: boolean;

  getUserInfoRequest: boolean;
  getUserInfoFailed: boolean;
  getUserInfoSuccess: boolean;

  patchUserInfoRequest: boolean;
  patchUserInfoFailed: boolean;
  patchUserInfoSuccess: boolean;

  registerRequest: boolean;
  registerFailed: boolean;
  registerSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetPasswordSuccess: boolean;

  accessToken?: string;
  refreshToken?: string;
  authorized: boolean;
  user?: IUser | null;
}

const initialState: TUserState = {
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

    patchUserInfoRequest: false,
    patchUserInfoFailed: false,
    patchUserInfoSuccess: false,

    registerRequest: false,
    registerFailed: false,
    registerSuccess: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,

    accessToken: undefined,
    refreshToken: undefined,
    
    authorized: false,
    user: JSON.parse(localStorage.getItem("user") ?? "null")
}

export type TUserAction = TActions<TActionsCreators<typeof userActions>>;

export const userReducer = (state = initialState, action: TUserAction): TUserState => {
    switch (action.type) {
        case AUTHORIZED: {
          return {
            ...state,
            accessToken: getAccessToken(),
          }
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
            localStorage.setItem('user', JSON.stringify({"email": action.user.email, "name": action.user.name}));
            
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
        case LOGIN_USER_FAILED: {
          return { 
              ...state,
              loginRequest: false,
              loginSuccess: false,
              loginFailed: true,
          };
        }
        case POST_LOGOUT: {
          return { 
              ...state,
              logoutRequest: true,
              logoutSuccess: false,
              logoutFailed: false,
          };
        }
        case LOGOUT_SUCCESS: {
          localStorage.clear();
          return { 
              ...state,
              logoutSuccess: true,
              logoutRequest: false,
              user: null,

              authorized: false,
          };
        }
        case LOGOUT_FAILED: {
          return {
            ...state,
            logoutRequest: false,
            logoutSuccess: false,
            logoutFailed: true,
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
          case GET_INFO_USER: {
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
          case PATCH_INFO_USER: {
            return {
                ...state,
                patchUserInfoRequest: true,
                patchUserInfoSuccess: false,
                patchUserInfoFailed: false,
            };
          }
          case PATCH_INFO_SUCCESS: {
            return { 
                ...state,
                user: action.user,
                patchUserInfoSuccess: action.success,
                patchUserInfoRequest: false,
            };
          }
          case PATCH_INFO_FAILED: {
            return { 
                ...state,
                patchUserInfoRequest: false,
                patchUserInfoSuccess: false,
                patchUserInfoFailed: true,
            };
          }
          case POST_REGISTRY_USER: {
            return {
                ...state,
                registerRequest: true,
                registerSuccess: false,
                registerFailed: false,
            };
          }
          case RESPONSE_SUCCESS_REGISTRY: {
            return { 
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                registerSuccess: action.success,
                registerRequest: false
            };
          }
          case RESPONSE_FAILED_REGISTRY: {
            return { 
                ...state,
                registerRequest: false,
                registerSuccess: false,
                registerFailed: true,
            };
          }
          case POST_PASSWORD_REQUEST || POST_NEW_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordSuccess: false,
                resetPasswordFailed: false,
            };
          }
          case RESPONSE_SUCCESS_PASSWORD || RESPONSE_SUCCESS_NEW_PASSWORD: {
            return { 
                ...state,
                resetPasswordSuccess: action.success,
                resetPasswordRequest: false,
            };
          }
          case RESPONSE_FAILED_PASSWORD || RESPONSE_FAILED_NEW_PASSWORD: {
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