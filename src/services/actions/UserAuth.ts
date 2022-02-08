import { BASE_URL } from '../../utils/constants';
import { IRegistryUser, IToken } from '../../utils/types';

export const INIT_USER = 'INIT_USER';
export const AUTHORIZED = 'AUTHORIZED';
export const GET_USER = 'GET_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const PATCH_USER = 'PATCH_USER';

export const POST_LOGIN_USER = 'POST_LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const POST_LOGOUT = 'POST_LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const POST_UPDATE_TOKEN = 'POST_UPDATE_TOKEN';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const GET_INFO_USER = 'GET_INFO_USER';
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS';
export const GET_INFO_FAILED = 'GET_INFO_FAILED';

export const PATCH_INFO_USER = 'PATCH_INFO_USER';

export const authUser = () => ({ type: AUTHORIZED });
export const loginUser = (user: IRegistryUser) => ({ type: LOGIN, user });
export const logoutUser = () => ({ type: LOGOUT });
export const getInfoUser = () => ({ type: GET_USER });
export const patchInfoUser = (user: IRegistryUser) => ({ type: PATCH_USER, user });

const loginUserFailed = () => ({ type: LOGIN_USER_FAILED });
const getInfoFailed = () => ({ type: GET_INFO_FAILED });
const updateTokenFailed = () => ({ type: UPDATE_TOKEN_FAILED });
const logoutFailed = () => ({ type: LOGOUT_FAILED });

export const login = (data: IRegistryUser) => {
  return (dispatch: any) => { 
      dispatch({
            type: POST_LOGIN_USER
      });
  
      fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          dispatch(loginUserFailed());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            success: response.success,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            user: { email: response.user.email, name: response.user.name },
        });  
      })
      .catch(error => {
        dispatch(loginUserFailed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export const logout = (data: IToken) => {
  return (dispatch: any) => { 
      dispatch({
            type: POST_LOGOUT
      });
  
      fetch(`${BASE_URL}auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "token": data.refreshToken})
      })
      .then(response => {
        if (!response.ok) {
          dispatch(logoutFailed());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: LOGOUT_SUCCESS,
            success: response.success,
        });
      })
      .catch(error => {
        dispatch(logoutFailed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function updateToken(data: IToken) {
  return function(dispatch: any) { 
      dispatch({
            type: POST_UPDATE_TOKEN
      });
  
    return fetch(`${BASE_URL}auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.accessToken ?? "",
        },
        body: JSON.stringify({ "token": data.refreshToken})
      })
      .then(response => {
        if (!response.ok) {
          dispatch((updateTokenFailed()));
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: UPDATE_TOKEN_SUCCESS,
            success: response.success,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
        });
      })
      .catch(error => {
        dispatch(updateTokenFailed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function getUser(data: IToken) {
    return function(dispatch: any) { 
      dispatch({
            type: GET_INFO_USER
      });
  
      fetch(`${BASE_URL}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data.accessToken ?? "",
        },
      })
      .then(response => {
        if (!response.ok) {
            dispatch(getInfoFailed());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: GET_INFO_SUCCESS,
            success: response.success,
            user: { email: response.user.email, name: response.user.name },
        });  
      })
      .catch(error => {
        dispatch(getInfoFailed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function patchUser(data: IRegistryUser, token: string) {
    return function(dispatch: any) { 
      dispatch({
            type: PATCH_INFO_USER
      });
  
      fetch(`${BASE_URL}auth/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) {
          dispatch(getInfoFailed());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: GET_INFO_SUCCESS,
            success: response.success,
            user: { email: response.user.email, name: response.user.name },
        });  
      })
      .catch(error => {
        dispatch(getInfoFailed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}