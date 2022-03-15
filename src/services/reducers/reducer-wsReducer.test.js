import { wsReducer } from './wsReducer';
import * as actions from '../../services/actions/wsActionTypes';
import dataMessages from "../../__tests__/data/messages.json";


describe('web socket reducer', () => {
  it('should return the initial state', () => {
      expect(wsReducer(undefined, {})).toEqual({
        wsConnected: false,
        messages: [],
      })
   })

   it('should handle WS_CONNECTION_START or WS_CONNECTION_START_ORDERS', () => {
        expect(wsReducer({}, {
            type: actions.WS_CONNECTION_START || actions.WS_CONNECTION_START_ORDERS
        })).toEqual({})
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer({}, {
            type: actions.WS_CONNECTION_SUCCESS
        })).toEqual({
            wsConnected: true
        })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer({}, {
            type: actions.WS_CONNECTION_ERROR
        })).toEqual({
            wsConnected: false
        })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer({}, {
            type: actions.WS_CONNECTION_CLOSED
        })).toEqual({
            wsConnected: false
        })
    })

    it('should handle WS_GET_MESSAGE', () => {
        const action = {
            type: actions.WS_GET_MESSAGE,
            message: dataMessages,
            success: true
        };
        expect(wsReducer({}, action)).toEqual({
            messages: [dataMessages]
        })
    })
})