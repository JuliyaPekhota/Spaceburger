import { BASE_URL } from '../../utils/constants';
import { IRegistryUser, IToken } from '../../utils/types';

export const authUser = () => ({ type: CHECK_AUTH_USER });

export const CHECK_AUTH_USER = 'CHECK_AUTH_USER';
export const AUTH_USER = 'AUTH_USER';
export const NO_AUTH_USER = 'NO_AUTH_USER';

export const POST_LOGIN_USER = 'POST_LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const POST_LOGOUT = 'POST_LOGOUT';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const POST_UPDATE_TOKEN = 'POST_UPDATE_TOKEN';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';


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
          dispatch({
            type: LOGIN_USER_FAILED
          });
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
        dispatch({
            type: LOGIN_USER_FAILED
        });
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
          dispatch({
            type: LOGOUT_FAILED
          });
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: LOGOUT,
            success: response.success,
        });
      })
      .catch(error => {
        dispatch({
            type: LOGOUT_FAILED
        });
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function updateToken(data: IToken) {
  return function(dispatch: any) { 
      dispatch({
            type: POST_UPDATE_TOKEN
      });
  
      fetch(`${BASE_URL}auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.accessToken ?? "",
        },
        body: JSON.stringify({ "token": data.refreshToken})
      })
      .then(response => {
        if (!response.ok) {
          dispatch({
            type: UPDATE_TOKEN_FAILED
          });
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
        
        const tokens = {"refreshToken": response.refreshToken, "accessToken": response.accessToken};
        localStorage.setItem('tokens', JSON.stringify(tokens));
        console.log(response.accessToken, response.refreshToken); 
      })
      .catch(error => {
        dispatch({
            type: UPDATE_TOKEN_FAILED
        });
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}