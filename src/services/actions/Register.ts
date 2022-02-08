import { BASE_URL } from '../../utils/constants';
import { IRegistryUser } from '../../utils/types';

export const POST_REGISTRY_USER = 'POST_REGISTRY_USER';
export const REGISTRY_USER_SUCCESS = 'REGISTRY_USER_SUCCESS';
export const REGISTRY_USER_FAILED = 'REGISTRY_USER_FAILED';

const registryUserFailed = () => ({ type: REGISTRY_USER_FAILED });

export function registry(data: IRegistryUser) {
    return function(dispatch: any) { 
      dispatch({
            type: POST_REGISTRY_USER
      });
  
      fetch(`${BASE_URL}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          dispatch(registryUserFailed());
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(response => {
        dispatch({
            type: REGISTRY_USER_SUCCESS,
            success: response.success,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
        });  
      })
      .catch(error => {
        dispatch(registryUserFailed());
        console.error('There has been a problem with fetch operation:', error);
      });
    }
}