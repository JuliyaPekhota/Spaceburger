import {
    POST_LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    CHECK_AUTH_USER,
    LOGOUT,
    AUTH_USER,
    NO_AUTH_USER,
    POST_UPDATE_TOKEN,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED,
} from '../actions/UserAuth';

const initialState = {
    loginRequest: false,
    loginFailed: false,
    loginSuccess: false,

    logoutRequest: false,
    logoutFailed: false,
    logoutSuccess: false,

    tokenRequest: false,
    tokenFailed: false,
    tokenSuccess: false,

    accessToken: undefined,
    refreshToken: undefined,
    
    authorized: !!localStorage.getItem("user"),
    user: void 0 // {} as IUser
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CHECK_AUTH_USER: {
            console.log("here CHECK_AUTH_USER");
            return state;
        }
        case AUTH_USER || NO_AUTH_USER: {
            return {
                ...state,
                authorized: action.authorized,
            };
        }
        case POST_LOGIN_USER: {
          return {
              ...state,
              loginRequest: true,
              loginSuccess: false,
              loginFailed: false,
          };
        }
        case LOGIN_USER_SUCCESS: {
            const tokens = {"refreshToken": action.refreshToken, "accessToken": action.accessToken};
            localStorage.setItem('tokens', JSON.stringify(tokens));
            localStorage.setItem('user', JSON.stringify({"email": action.user?.email, "name": action.user?.name}));
            
            return { 
              ...state,
              accessToken: action.accessToken,
              refreshToken: action.refreshToken,
              loginSuccess: action.success,
              user: action.user,
              loginRequest: false,

              authorized: true,
          };
        }
        case LOGOUT: {
            localStorage.clear();
            console.log("authorized Logout false");
            return { 
                ...state,
                logoutSuccess: action.success,
                logoutRequest: false,
                user: void 0, //void 0,
  
                authorized: false,
            };
          }
        case LOGIN_USER_FAILED: {
          return { 
              ...state,
              loginRequest: false,
              loginSuccess: false,
              loginFailed: true,
          };
        }
        case POST_UPDATE_TOKEN: {
            return {
                ...state,
                tokenRequest: true,
                tokenSuccess: false,
                tokenFailed: false,
            };
          }
          case UPDATE_TOKEN_SUCCESS: {
            const tokens = {"refreshToken": action.refreshToken, "accessToken": action.accessToken};
            localStorage.setItem('tokens', JSON.stringify(tokens));
            localStorage.setItem('user', JSON.stringify({"email": action.user?.email, "name": action.user?.name}));
            return { 
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                tokenSuccess: action.success,
                tokenRequest: false,
            };
          }
          case UPDATE_TOKEN_FAILED: {
            return { 
                ...state,
                tokenRequest: false,
                tokenSuccess: false,
                tokenFailed: true,
            };
          }
        default: {
            return state
        }
      }
};