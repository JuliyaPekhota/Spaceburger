import { BASE_URL } from '../../utils/constants';
import { IPasswordData } from '../../utils/types';

export const POST_PASSWORD_REQUEST = 'POST_PASSWORD_REQUEST';
export const GET_RESTORE_EMAIL_SUCCESS = 'GET_RESTORE_EMAIL_SUCCESS';
export const FAILED = 'FAILED';

export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';

const Failed = () => ({ type: FAILED });

export function restoreEmail(email: string) {
    return function(dispatch: any) { 
      dispatch({
            type: POST_PASSWORD_REQUEST
      });
  
      fetch(`${BASE_URL}password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email": email})
      })
      .then(response => {
        if (!response.ok) {
          dispatch(Failed());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: GET_RESTORE_EMAIL_SUCCESS,
            massage: response.message,
            success: response.success
        });  
      })
      .catch(error => {
        dispatch(Failed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}

export function sendNewPassword(data: IPasswordData) {
  return function(dispatch: any) { 
    dispatch({
          type: POST_PASSWORD_REQUEST
    });

    fetch(`${BASE_URL}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        dispatch(Failed());
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(response => {
      dispatch({
          type: SET_NEW_PASSWORD_SUCCESS,
          massage: response.message,
          success: response.success
      });  
    })
    .catch(error => {
      dispatch(Failed());
      console.error('There has been a problem with fetch operation:', error);
    });
  }
}