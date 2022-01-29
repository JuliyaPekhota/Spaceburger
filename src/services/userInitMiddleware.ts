import {
  AUTH_USER,
  NO_AUTH_USER,
  CHECK_AUTH_USER,
} from './actions/UserAuth';
import jwtDecode from "jwt-decode";
import { JWTDeCode } from '../utils/types';
import { updateToken } from './actions/UserAuth';

export const userInitMiddleware = (store: any) => (next: any) => (action: any) => {
    if (action.type === CHECK_AUTH_USER) {
      console.log("Middleware");
      const isAuthUser = !!localStorage.getItem("user");
        if(isAuthUser) {
          
          const token = localStorage.getItem('tokens') ?? null;
          if (token !== null) {
            const { accessToken, refreshToken } = JSON.parse(token);
            const decoder: JWTDeCode = jwtDecode(accessToken);
            if (decoder && decoder.exp < Date.now() / 1000) {
              // checking if the token is expired
              store.dispatch(updateToken({ refreshToken, accessToken }));
              return;
            }
          }
          store.dispatch({ type: AUTH_USER, authorized: true });
          return;

        } else {
          store.dispatch({ type: NO_AUTH_USER, authorized: false });
          return;
        }
    }

    return next(action);
  }