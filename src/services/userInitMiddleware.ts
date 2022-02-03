import {
  LOGIN,
  LOGOUT,
  GET_USER,
  PATCH_USER,
  INIT_USER,
  AUTHORIZED
} from './actions/UserAuth';
import jwtDecode from "jwt-decode";
import { JWTDeCode } from '../utils/types';
import { login, logout, getUser, patchUser, updateToken } from './actions/UserAuth';
import { GET_ORDER, getOrderNumber } from './actions/OrderDetails';

export const userInitMiddleware = (store: any) => (next: any) => (action: any) => {
  const token = localStorage.getItem('tokens') ?? null;
    
        if (token !== null) {
          const { accessToken, refreshToken } = JSON.parse(token);
          const decoder: JWTDeCode = jwtDecode(accessToken);
          const expiredToken = decoder && decoder.exp < Date.now() / 1000;

          switch (action.type) {
            case AUTHORIZED: {
              next({ type: INIT_USER });
              break;
            }
            case LOGOUT: {
              if (expiredToken) {
                next(updateToken({refreshToken, accessToken}));
                setTimeout(() => {
                  next(logout({ refreshToken: store.getState().user.refreshToken }));
                }, 1000)
              } else {
                next(logout({ refreshToken }));
              }

              break;
            }
            case GET_USER: {
              if (expiredToken) {
                next(updateToken({refreshToken, accessToken}));
                setTimeout(() => {
                  next(getUser({ accessToken: store.getState().user.accessToken }));
                }, 1000)
              } else {
                next(getUser({ accessToken }));
              }

              break;
            }
            case PATCH_USER: {
              if (expiredToken) {
                next(updateToken({refreshToken, accessToken}));
                setTimeout(() => {
                  next(patchUser(action.user, store.getState().user.accessToken));
                }, 1000)
              } else {
                next(patchUser(action.user, accessToken));
              }

              break;
            }
            case GET_ORDER: {
              if (expiredToken) {
                next(updateToken({refreshToken, accessToken}));
                setTimeout(() => {
                  next(getOrderNumber(action.ingredientIds, store.getState().user.accessToken));
                }, 1000)
              } else {
                next(getOrderNumber(action.ingredientIds, accessToken));
              }

              break;
            }
            default:
              break;
          }
        
        } else {

          if (action.type === LOGIN) {
            next(login(action.user));
            return;
          }

        }  
  next(action);
}

