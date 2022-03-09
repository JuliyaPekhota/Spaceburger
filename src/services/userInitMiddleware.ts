import { Middleware } from "redux";
import { initUser } from './actions/actionsUser';
import {
  LOGIN,
  LOGOUT,
  GET_USER,
  PATCH_USER,
  AUTHORIZED,
  INIT_ORDERS
} from './actions/User';
import jwtDecode from "jwt-decode";
import { JWTDeCode } from '../utils/types';
import { TAppState, TAppAction } from '../services/reducers';
import { login, logout, getUser, patchUser, updateToken } from './actions/User';
import { GET_ORDER, getOrderNumber } from './actions/OrderDetails';
import { TThunkDispatch } from '../utils/hooks';
import { wsInitOrders } from '../services/actions/actionsWs';

export const userInitMiddleware: Middleware<{}, TAppState> = store => (next: TThunkDispatch)  => (action: TAppAction) => {
  const token = localStorage.getItem('tokens') ?? null;
    
        if (token !== null) {
          const { accessToken, refreshToken } = JSON.parse(token);
          const decoder: JWTDeCode = jwtDecode(accessToken);
          const expiredToken = decoder && decoder.exp < Date.now() / 1000;

          switch (action.type) {
            case AUTHORIZED: {
              next(initUser());
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
                  next(patchUser(action.user, store.getState().user.accessToken ?? accessToken));
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
                  next(getOrderNumber(action.ingredientIds, store.getState().user.accessToken ?? accessToken));
                }, 1000)
              } else {
                next(getOrderNumber(action.ingredientIds, accessToken));
              }

              break;
            }
            case INIT_ORDERS: {
              if (expiredToken) {
                next(updateToken({refreshToken, accessToken}));
                setTimeout(() => {
                  next(wsInitOrders());
                }, 1000)
              } else {
                next(wsInitOrders());
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

