import {
  INIT_USER,
  AUTHORIZED, 
  LOGIN,
  LOGOUT,
  GET_USER,
  PATCH_USER,
  POST_LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  POST_LOGOUT,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,

  POST_UPDATE_TOKEN,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,

  GET_INFO_USER,
  GET_INFO_SUCCESS,
  GET_INFO_FAILED,

  PATCH_INFO_USER,
  PATCH_INFO_SUCCESS,
  PATCH_INFO_FAILED,
  
  POST_REGISTRY_USER, RESPONSE_SUCCESS_REGISTRY, RESPONSE_FAILED_REGISTRY,
  POST_PASSWORD_REQUEST, RESPONSE_FAILED_PASSWORD, RESPONSE_SUCCESS_PASSWORD,
  POST_NEW_PASSWORD_REQUEST, RESPONSE_FAILED_NEW_PASSWORD, RESPONSE_SUCCESS_NEW_PASSWORD
} from './User';
import { IRegistryUser, IUser } from '../../utils/types';

export const initUser = () => ({ type: INIT_USER }) as const;
export const authUser = () => ({ type: AUTHORIZED }) as const;
export const loginUser = (user: IRegistryUser) => ({ type: LOGIN, user }) as const;
export const logoutUser = () => ({ type: LOGOUT }) as const;
export const getInfoUser = () => ({ type: GET_USER }) as const;
export const patchInfoUser = (user: IRegistryUser) => ({ type: PATCH_USER, user }) as const;

//Login
export const postingLogin = () => ({ type: POST_LOGIN_USER }) as const;
export const failedLogin = () => ({ type: LOGIN_USER_FAILED}) as const;
export const successLogin = (success: boolean, accessToken: string, refreshToken: string, user: IUser) => 
({ type: LOGIN_USER_SUCCESS, success, accessToken, refreshToken, user }) as const;

//Logout
export const postingLogout = () => ({ type: POST_LOGOUT }) as const;
export const failedLogout = () => ({ type: LOGOUT_FAILED }) as const;
export const successLogout = () => ({ type: LOGOUT_SUCCESS }) as const;

//Update token
export const postingToken = () => ({ type: POST_UPDATE_TOKEN }) as const;
export const failedToken = () => ({ type: UPDATE_TOKEN_FAILED }) as const;
export const successToken = (success: boolean, accessToken: string, refreshToken: string) => 
({ type: UPDATE_TOKEN_SUCCESS, success, accessToken, refreshToken }) as const;

//Get Info about user
export const getUserInfo = () => ({ type: GET_INFO_USER }) as const;
export const failedUserInfo = () => ({ type: GET_INFO_FAILED }) as const;
export const successUserInfo = (success: boolean, user: IUser) => 
({ type: GET_INFO_SUCCESS, success, user }) as const;

//Patch Info User
export const patchUserInfo = () => ({ type: PATCH_INFO_USER }) as const;
export const failedPatchInfo = () => ({ type: PATCH_INFO_FAILED }) as const;
export const successPatchInfo = (success: boolean, user: IUser) =>
({ type: PATCH_INFO_SUCCESS, success, user }) as const;

// Registry User
export const failedRegistry = () => ({ type: RESPONSE_FAILED_REGISTRY }) as const;
export const postingRegistry = () => ({ type: POST_REGISTRY_USER }) as const;
export const successRegistry = (success: boolean, accessToken: string, refreshToken: string) => 
({ type: RESPONSE_SUCCESS_REGISTRY, success, accessToken, refreshToken }) as const;

//Restore Email
export const failedRestoreEmail = () => ({ type: RESPONSE_FAILED_PASSWORD }) as const;
export const postingPasswordRequest = () => ({ type: POST_PASSWORD_REQUEST }) as const;
export const successRestoreEmail = (massage: string, success: boolean) => 
({ type: RESPONSE_SUCCESS_PASSWORD, massage, success }) as const;

// Send New Password
export const failedNewPassword = () => ({ type: RESPONSE_FAILED_NEW_PASSWORD }) as const;
export const postingNewPassword = () => ({ type: POST_NEW_PASSWORD_REQUEST }) as const;
export const successNewPassword = (massage: string, success: boolean) => 
({ type: RESPONSE_SUCCESS_NEW_PASSWORD, massage, success }) as const;