import { orderReducer } from '../../services/reducers/OrderDetails';
import * as actions from '../../services/actions/OrderDetails';


describe('order details reducer', () => {
  it('should return the initial state', () => {
      expect(orderReducer(undefined, {})).toEqual({
        orderRequest: false,
        orderFailed: false,
        orderSuccess: false,
        number: null
      })
   })

   it('should handle POST_ORDER_NUMBER_REQUEST', () => {
        expect(orderReducer({}, {
            type: actions.POST_ORDER_NUMBER_REQUEST
        })
            ).toEqual(
        {
            orderRequest: true,
            orderSuccess: false,
            orderFailed: false,
        })
    })

    it('should handle GET_ORDER_NUMBER_SUCCESS', () => {
        const action = {
            type: actions.GET_ORDER_NUMBER_SUCCESS,
            success: true,
            value: "11712",
        };
        const state = {
            number: null,
            orderSuccess: false,
            orderRequest: true,
        };
        expect(orderReducer(state, action)).toEqual({
            number: "11712",
            orderSuccess: true,
            orderRequest: false,
          });
    })

    it('should handle GET_ORDER_NUMBER_FAILED', () => {
        expect(orderReducer({}, {
            type: actions.GET_ORDER_NUMBER_FAILED
          })
          ).toEqual({
            orderRequest: false,
            orderSuccess: false,
            orderFailed: true,
          });
    })

})    