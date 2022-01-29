import { BASE_URL } from '../../utils/constants';
import { IRegistryUser, IToken } from '../../utils/types';

export const GET_INFO_USER = 'GET_INFO_USER';
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS';
export const GET_INFO_FAILED = 'GET_INFO_FAILED';

export const PATCH_INFO_USER = 'PATCH_INFO_USER';

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
            dispatch({
            type: GET_INFO_FAILED,
            status: response.status
          });
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: GET_INFO_SUCCESS,
            success: response.success,
            userEmail: response.user.email,
            userName: response.user.name,
        });  
      })
      .catch(error => {
        dispatch({
            type: GET_INFO_FAILED
        });
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
          dispatch({
            type: GET_INFO_FAILED
          });
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: GET_INFO_SUCCESS,
            success: response.success,
            userEmail: response.user.email,
            userName: response.user.name
        });  
      })
      .catch(error => {
        dispatch({
            type: GET_INFO_FAILED
        });
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}
