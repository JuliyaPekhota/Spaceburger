import { BASE_URL } from '../../utils/constants';
import { IRegistryUser, IToken, AppDispatch, IPasswordData } from '../../utils/types';
import * as userActions from './actionsUser';

export const INIT_USER = 'INIT_USER';
export const AUTHORIZED = 'AUTHORIZED';
export const GET_USER = 'GET_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const PATCH_USER = 'PATCH_USER';
export const INIT_ORDERS = 'INIT_ORDERS';

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
export const PATCH_INFO_FAILED = 'PATCH_INFO_FAILED';
export const PATCH_INFO_SUCCESS = 'PATCH_INFO_SUCCESS';

export const POST_REGISTRY_USER = 'POST_REGISTRY_USER';
export const RESPONSE_SUCCESS_REGISTRY = 'RESPONSE_SUCCESS_REGISTRY';
export const RESPONSE_FAILED_REGISTRY = 'RESPONSE_FAILED_REGISTRY';

export const POST_PASSWORD_REQUEST = 'POST_PASSWORD_REQUEST';
export const RESPONSE_FAILED_PASSWORD = 'RESPONSE_FAILED_PASSWORD';
export const RESPONSE_SUCCESS_PASSWORD = 'RESPONSE_SUCCESS_PASSWORD';

export const POST_NEW_PASSWORD_REQUEST = 'POST_NEW_PASSWORD_REQUEST';
export const RESPONSE_FAILED_NEW_PASSWORD = 'RESPONSE_FAILED_NEW_PASSWORD';
export const RESPONSE_SUCCESS_NEW_PASSWORD = 'RESPONSE_SUCCESS_NEW_PASSWORD';

export const login = (data: IRegistryUser) => {
  return (dispatch: AppDispatch) => { 
      dispatch(userActions.postingLogin());
  
      fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          dispatch(userActions.failedLogin());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch(userActions.successLogin(
          response.success, 
          response.accessToken, 
          response.refreshToken, 
          { email: response.user.email, name: response.user.name }
        ));  
      })
      .catch(error => {
        dispatch(userActions.failedLogin());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export const logout = (data: IToken) => {
  return (dispatch: AppDispatch) => { 
      dispatch(userActions.postingLogout());
  
      fetch(`${BASE_URL}auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "token": data.refreshToken})
      })
      .then(response => {
        if (!response.ok) {
          dispatch(userActions.failedLogout());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(() => {
        dispatch(userActions.successLogout());
      })
      .catch(error => {
        dispatch(userActions.failedLogout());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function updateToken(data: IToken) {
  return function(dispatch: AppDispatch) { 
      dispatch(userActions.postingToken());
  
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
          dispatch(userActions.failedToken());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch(userActions.successToken(response.success, response.accessToken, response.refreshToken));
      })
      .catch(error => {
        dispatch(userActions.failedToken());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function getUser(data: IToken) {
    return function(dispatch: AppDispatch) { 
      dispatch(userActions.getUserInfo());
  
      fetch(`${BASE_URL}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data.accessToken ?? "",
        },
      })
      .then(response => {
        if (!response.ok) {
            dispatch(userActions.failedUserInfo());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch(userActions.successUserInfo(response.success, { email: response.user.email, name: response.user.name }));  
      })
      .catch(error => {
        dispatch(userActions.failedUserInfo());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function patchUser(data: IRegistryUser, token: string) {
    return function(dispatch: AppDispatch) { 
      dispatch(userActions.patchUserInfo());
  
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
          dispatch(userActions.failedPatchInfo());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch(userActions.successPatchInfo(response.success, { email: response.user.email, name: response.user.name }));  
      })
      .catch(error => {
        dispatch(userActions.failedPatchInfo());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function registry(data: IRegistryUser) {
  return function(dispatch: AppDispatch) { 
    dispatch(userActions.postingRegistry());

    fetch(`${BASE_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        dispatch(userActions.failedRegistry());
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(response => {
      dispatch(userActions.successRegistry(response.success, response.accessToken, response.refreshToken));  
    })
    .catch(error => {
      dispatch(userActions.failedRegistry());
      console.error('There has been a problem with fetch operation:', error);
    });
  }
}

export function restoreEmail(email: string) {
  return function(dispatch: AppDispatch) { 
    dispatch(userActions.postingPasswordRequest());

    fetch(`${BASE_URL}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": email})
    })
    .then(response => {
      if (!response.ok) {
        dispatch(userActions.failedRestoreEmail());
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(response => {
      dispatch(userActions.successRestoreEmail(response.message, response.success)); 
    })
    .catch(error => {
      dispatch(userActions.failedRestoreEmail());
      console.error('There has been a problem with fetch operation:', error);
    });
  }
}

export function sendNewPassword(data: IPasswordData) {
return function(dispatch: AppDispatch) { 
  dispatch(userActions.postingNewPassword());

  fetch(`${BASE_URL}password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      dispatch(userActions.failedNewPassword());
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then(response => {
    dispatch(userActions.successNewPassword(response.message, response.success));  
  })
  .catch(error => {
    dispatch(userActions.failedNewPassword());
    console.error('There has been a problem with fetch operation:', error);
  });
}
}