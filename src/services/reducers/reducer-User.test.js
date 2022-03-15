import { userReducer } from '../../services/reducers/User';
import * as actions from '../../services/actions/User';
import { getAccessToken } from '../../utils/utils';

describe('user reducer', () => {
  it('should return the initial state', () => {
      expect(userReducer(undefined, {})).toEqual({
        loginRequest: false,
        loginFailed: false,
        loginSuccess: false,

        logoutRequest: false,
        logoutFailed: false,
        logoutSuccess: false,

        tokenRequest: false,
        tokenFailed: false,
        tokenSuccess: false,

        getUserInfoRequest: false,
        getUserInfoFailed: false,
        getUserInfoSuccess: false,

        patchUserInfoRequest: false,
        patchUserInfoFailed: false,
        patchUserInfoSuccess: false,

        registerRequest: false,
        registerFailed: false,
        registerSuccess: false,

        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: false,

        accessToken: undefined,
        refreshToken: undefined,
        
        authorized: false,
        user: JSON.parse(localStorage.getItem("user") ?? "null")
      })
   })

   it('should handle AUTHORIZED', () => {
        expect(userReducer({}, {
            type: actions.AUTHORIZED
        })).toEqual({
            accessToken: getAccessToken()
        })
    })

    it('should handle INIT_USER', () => {
        expect(userReducer({}, {
            type: actions.INIT_USER
        })).toEqual({
            authorized: true
        })
    })

    it('should handle POST_LOGIN_USER', () => {
        expect(userReducer({}, {
            type: actions.POST_LOGIN_USER
        })).toEqual({
            loginRequest: true,
            loginSuccess: false,
            loginFailed: false,
        })
    })

    it('should handle LOGIN_USER_SUCCESS', () => {
        expect(userReducer({}, {
            type: actions.LOGIN_USER_SUCCESS,
            success: true,
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWM1OTEwNmQ3Y2Q4MDAxYjJkMWQ0MiIsImlhdCI6MTY0NzI0MzE5MiwiZXhwIjoxNjQ3MjQ0MzkyfQ.QqGtnZV6JcDVgnnFkZzDiz0LjCdkAadsMOQAYHiGwII", 
            refreshToken: "c41a0c9b9e5b9b59e929ef1ae0b7b031e3418a3119eb487a9d0342263ffe6956a024251eb8da57c5", 
            user: {"email":"test@gmail.ru","name":"Jukki"}
        })).toEqual({
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWM1OTEwNmQ3Y2Q4MDAxYjJkMWQ0MiIsImlhdCI6MTY0NzI0MzE5MiwiZXhwIjoxNjQ3MjQ0MzkyfQ.QqGtnZV6JcDVgnnFkZzDiz0LjCdkAadsMOQAYHiGwII", 
            refreshToken: "c41a0c9b9e5b9b59e929ef1ae0b7b031e3418a3119eb487a9d0342263ffe6956a024251eb8da57c5", 
            loginSuccess: true,
            loginRequest: false,
            user: { email: "test@gmail.ru", name: "Jukki" },
            authorized: true,
        })
    })

    it('should handle LOGIN_USER_FAILED', () => {
        expect(userReducer({}, {
            type: actions.LOGIN_USER_FAILED
        })).toEqual({
            loginRequest: false,
            loginSuccess: false,
            loginFailed: true,
        })
    })

    it('should handle POST_LOGOUT', () => {
        expect(userReducer({}, {
            type: actions.POST_LOGOUT
        })).toEqual({
            logoutRequest: true,
            logoutSuccess: false,
            logoutFailed: false,
        })
    })

    it('should handle LOGOUT_SUCCESS', () => {
        expect(userReducer({}, {
            type: actions.LOGOUT_SUCCESS
        })).toEqual({
            logoutSuccess: true,
            logoutRequest: false,
            user: null,

            authorized: false,
        })
    })

    it('should handle LOGOUT_FAILED', () => {
        expect(userReducer({}, {
            type: actions.LOGOUT_FAILED
        })).toEqual({
            logoutRequest: false,
            logoutSuccess: false,
            logoutFailed: true,
        })
    })

    it('should handle POST_UPDATE_TOKEN', () => {
        expect(userReducer({}, {
            type: actions.POST_UPDATE_TOKEN
        })).toEqual({
            tokenRequest: true,
            tokenSuccess: false,
            tokenFailed: false,
        })
    })

    it('should handle UPDATE_TOKEN_SUCCESS', () => {
        expect(userReducer({}, {
            type: actions.UPDATE_TOKEN_SUCCESS,
            success: true, 
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWM1OTEwNmQ3Y2Q4MDAxYjJkMWQ0MiIsImlhdCI6MTY0NzI0MzE5MiwiZXhwIjoxNjQ3MjQ0MzkyfQ.QqGtnZV6JcDVgnnFkZzDiz0LjCdkAadsMOQAYHiGwII", 
            refreshToken: "c41a0c9b9e5b9b59e929ef1ae0b7b031e3418a3119eb487a9d0342263ffe6956a024251eb8da57c5", 
        })).toEqual({
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWM1OTEwNmQ3Y2Q4MDAxYjJkMWQ0MiIsImlhdCI6MTY0NzI0MzE5MiwiZXhwIjoxNjQ3MjQ0MzkyfQ.QqGtnZV6JcDVgnnFkZzDiz0LjCdkAadsMOQAYHiGwII", 
            refreshToken: "c41a0c9b9e5b9b59e929ef1ae0b7b031e3418a3119eb487a9d0342263ffe6956a024251eb8da57c5",
            tokenSuccess: true,
            tokenRequest: false,
        })
    })

    it('should handle UPDATE_TOKEN_FAILED', () => {
        expect(userReducer({}, {
            type: actions.UPDATE_TOKEN_FAILED
        })).toEqual({
            tokenRequest: false,
            tokenSuccess: false,
            tokenFailed: true,
        })
    })

    it('should handle GET_INFO_USER', () => {
        expect(userReducer({}, {
            type: actions.GET_INFO_USER
        })).toEqual({
            getUserInfoRequest: true,
            getUserInfoSuccess: false,
            getUserInfoFailed: false,
        })
    })

    it('should handle GET_INFO_SUCCESS', () => {
        expect(userReducer({}, {
            type: actions.GET_INFO_SUCCESS,
            success: true, 
            user: {"email":"test@gmail.ru","name":"Jukki"}
        })).toEqual({
            user: {"email":"test@gmail.ru","name":"Jukki"},
            getUserInfoSuccess: true,
            getUserInfoRequest: false,
        })
    })

    it('should handle GET_INFO_FAILED', () => {
        expect(userReducer({}, {
            type: actions.GET_INFO_FAILED
        })).toEqual({
            getUserInfoRequest: false,
            getUserInfoSuccess: false,
            getUserInfoFailed: true,
        })
    })

    it('should handle PATCH_INFO_USER', () => {
        expect(userReducer({}, {
            type: actions.PATCH_INFO_USER
        })).toEqual({
            patchUserInfoRequest: true,
            patchUserInfoSuccess: false,
            patchUserInfoFailed: false,
        })
    })

    it('should handle PATCH_INFO_SUCCESS', () => {
        expect(userReducer({}, {
            type: actions.PATCH_INFO_SUCCESS,
            success: true, 
            user: {"email":"test@gmail.ru","name":"Jukki"}
        })).toEqual({
            user: {"email":"test@gmail.ru","name":"Jukki"},
            patchUserInfoSuccess: true,
            patchUserInfoRequest: false,
        })
    })

    it('should handle PATCH_INFO_FAILED', () => {
        expect(userReducer({}, {
            type: actions.PATCH_INFO_FAILED
        })).toEqual({
            patchUserInfoRequest: false,
            patchUserInfoSuccess: false,
            patchUserInfoFailed: true,
        })
    })

    it('should handle POST_REGISTRY_USER', () => {
        expect(userReducer({}, {
            type: actions.POST_REGISTRY_USER
        })).toEqual({
            registerRequest: true,
            registerSuccess: false,
            registerFailed: false,
        })
    })

    it('should handle RESPONSE_SUCCESS_REGISTRY', () => {
        expect(userReducer({}, {
            type: actions.RESPONSE_SUCCESS_REGISTRY, 
            success: true, 
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWM1OTEwNmQ3Y2Q4MDAxYjJkMWQ0MiIsImlhdCI6MTY0NzI0MzE5MiwiZXhwIjoxNjQ3MjQ0MzkyfQ.QqGtnZV6JcDVgnnFkZzDiz0LjCdkAadsMOQAYHiGwII", 
            refreshToken: "c41a0c9b9e5b9b59e929ef1ae0b7b031e3418a3119eb487a9d0342263ffe6956a024251eb8da57c5",
        })).toEqual({
            accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWM1OTEwNmQ3Y2Q4MDAxYjJkMWQ0MiIsImlhdCI6MTY0NzI0MzE5MiwiZXhwIjoxNjQ3MjQ0MzkyfQ.QqGtnZV6JcDVgnnFkZzDiz0LjCdkAadsMOQAYHiGwII", 
            refreshToken: "c41a0c9b9e5b9b59e929ef1ae0b7b031e3418a3119eb487a9d0342263ffe6956a024251eb8da57c5",
            registerSuccess: true,
            registerRequest: false
        })
    })

    it('should handle RESPONSE_FAILED_REGISTRY', () => {
        expect(userReducer({}, {
            type: actions.RESPONSE_FAILED_REGISTRY
        })).toEqual({
            registerRequest: false,
            registerSuccess: false,
            registerFailed: true,
        })
    })

    it('should handle POST_PASSWORD_REQUEST or POST_NEW_PASSWORD_REQUEST', () => {
        expect(userReducer({}, {
            type: actions.POST_PASSWORD_REQUEST || actions.POST_NEW_PASSWORD_REQUEST
        })).toEqual({
            resetPasswordRequest: true,
            resetPasswordSuccess: false,
            resetPasswordFailed: false,
        })
    })

    it('should handle RESPONSE_SUCCESS_PASSWORD or RESPONSE_SUCCESS_NEW_PASSWORD', () => {
        expect(userReducer({}, {
            type: actions.RESPONSE_SUCCESS_PASSWORD || actions.RESPONSE_SUCCESS_NEW_PASSWORD,
            success: true
        })).toEqual({
            resetPasswordSuccess: true,
            resetPasswordRequest: false,
        })
    })

    it('should handle RESPONSE_FAILED_PASSWORD or RESPONSE_FAILED_NEW_PASSWORD', () => {
        expect(userReducer({}, {
            type: actions.RESPONSE_FAILED_PASSWORD || actions.RESPONSE_FAILED_NEW_PASSWORD
        })).toEqual({
            resetPasswordRequest: false,
            resetPasswordSuccess: false,
            resetPasswordFailed: true,
        })
    })
})    