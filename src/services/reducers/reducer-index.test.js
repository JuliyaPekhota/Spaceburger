import { ingredientsReducer } from '../../services/reducers/index';
import * as actions from '../../services/actions/index';
import ingredients from "../../__tests__/data/ingredients.json";
import ingredientsInOrder from "../../__tests__/data/ingredientsInOrder.json";

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual({
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsSuccess: false,
    
        openIngredientId: null,
    
        ingredients: [],
        ingredientsInOrder: []
      })
    })
  
    it('should handle GET_INGREDIENTS_REQUEST', () => {
      expect(ingredientsReducer({}, {
            type: actions.GET_INGREDIENTS_REQUEST
        })
      ).toEqual(
        {
            ingredientsRequest: true,
            ingredientsFailed: false,
            ingredientsSuccess: false
        }
      )
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const action = {
            type: actions.GET_INGREDIENTS_SUCCESS,
            ingredients: ingredients,
            ingredientsSuccess: true,
          };
        expect(ingredientsReducer({}, action)).toEqual({
            ingredients: ingredients, 
            ingredientsSuccess: true,
            ingredientsRequest: false, 
          });
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer({}, {
            type: actions.GET_INGREDIENTS_FAILED
          })
          ).toEqual({
            ingredientsSuccess: false,
            ingredientsRequest: false,
            ingredientsFailed: true, 
          });
    })

    it('should handle ADD_INGREDIENT_BUN_IN_ORDER if it is a bun', () => {
      const action = {
          type: actions.ADD_INGREDIENT_BUN_IN_ORDER,
          _id: "60d3b41abdacab0026a733c6"
      };
      const state = {
        ingredients: ingredients,
        ingredientsInOrder: []
      }

      expect(ingredientsReducer(state, action))
          .toEqual({
            ingredients: ingredients,
            ingredientsInOrder: [{
                _id: "60d3b41abdacab0026a733c6",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                __v: 0
            }]
          });
    })

    it('should handle ADD_INGREDIENT_IN_ORDER if it is not a bun', () => {
      const action = {
          type: actions.ADD_INGREDIENT_IN_ORDER,
          id: '110251a4-ba42-45ac-9c48-0c5c9932eef1',
          _id: '60d3b41abdacab0026a733cd'
      };
      const state = {
        ingredients: ingredients,
        ingredientsInOrder: []
      }

      expect(ingredientsReducer(state, action))
          .toEqual({
            ingredients: ingredients,
            ingredientsInOrder: [{
                _id: "60d3b41abdacab0026a733cd",
                name: "Соус фирменный Space Sauce",
                type: "sauce",
                proteins: 50,
                fat: 22,
                carbohydrates: 11,
                calories: 14,
                price: 80,
                image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                __v: 0,
                id: "110251a4-ba42-45ac-9c48-0c5c9932eef1"
            }]
          });
    })

    it('should handle DELETE_INGREDIENT_IN_ORDER', () => {
      const action = {
          type: actions.DELETE_INGREDIENT_IN_ORDER,
          _id: '60d3b41abdacab0026a733cf'
      };
      const state = {
        ingredients: ingredients,
        ingredientsInOrder: [
          {
              _id: "60d3b41abdacab0026a733c7",
              name: "Флюоресцентная булка R2-D3",
              type: "bun",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/bun-01.png",
              image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
              image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
              __v: 0
          },
          {
              _id: "60d3b41abdacab0026a733cf",
              name: "Соус с шипами Антарианского плоскоходца",
              type: "sauce",
              proteins: 101,
              fat: 99,
              carbohydrates: 100,
              calories: 100,
              price: 88,
              image: "https://code.s3.yandex.net/react/code/sauce-01.png",
              image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
              image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
              __v: 0,
              id: "25b1e67d-0420-447c-a3aa-bba4f30f1ec5"
          }
      ]}
      expect(ingredientsReducer(state, action))
          .toEqual({
            ingredients: ingredients,
            ingredientsInOrder: [{
                  _id: "60d3b41abdacab0026a733c7",
                  name: "Флюоресцентная булка R2-D3",
                  type: "bun",
                  proteins: 44,
                  fat: 26,
                  carbohydrates: 85,
                  calories: 643,
                  price: 988,
                  image: "https://code.s3.yandex.net/react/code/bun-01.png",
                  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                  __v: 0
              }]
          });
    })

    it('should handle DELETE_INGREDIENTS clearing the array of orders', () => {
      const action = {
          type: actions.DELETE_INGREDIENTS
      };
      const state = {
        ingredientsInOrder: ingredientsInOrder
      }

      expect(ingredientsReducer(state, action))
          .toEqual({ ingredientsInOrder: [] });
    })

    it('should handle UPDATE_LOCATION_INGREDIENT_IN_ORDER ingredient movement', () => {
      const action = {
          type: actions.UPDATE_LOCATION_INGREDIENT_IN_ORDER,
          dragIndex: 2, 
          hoverIndex: 1

      };
      const state = {
        ingredientsInOrder: ingredientsInOrder
      }

      expect(ingredientsReducer(state, action))
          .toEqual({ 
            ingredientsInOrder: [
              {
                  _id: "60d3b41abdacab0026a733c6",
                  name: "Краторная булка N-200i",
                  type: "bun",
                  proteins: 80,
                  fat: 24,
                  carbohydrates: 53,
                  calories: 420,
                  price: 1255,
                  image: "https://code.s3.yandex.net/react/code/bun-02.png",
                  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                  __v: 0
              },
              {
                  _id: "60d3b41abdacab0026a733cb",
                  name: "Биокотлета из марсианской Магнолии",
                  type: "main",
                  proteins: 420,
                  fat: 142,
                  carbohydrates: 242,
                  calories: 4242,
                  price: 424,
                  image: "https://code.s3.yandex.net/react/code/meat-01.png",
                  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
                  __v: 0,
                  id: "ee129d74-9083-4c95-992c-dd578f637093"
              },
              {
                  _id: "60d3b41abdacab0026a733cd",
                  name: "Соус фирменный Space Sauce",
                  type: "sauce",
                  proteins: 50,
                  fat: 22,
                  carbohydrates: 11,
                  calories: 14,
                  price: 80,
                  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                  __v: 0,
                  id: "110251a4-ba42-45ac-9c48-0c5c9932eef1"
              }
          ] 
        });
    })

    it('should handle OPEN_MODAL_DETAILS', () => {
      const action = {
          type: actions.OPEN_MODAL_DETAILS,
          _id: "60d3b41abdacab0026a733cb",
      };

      expect(ingredientsReducer({}, action))
          .toEqual({ openIngredientId: "60d3b41abdacab0026a733cb" });
    })

    it('should handle CLOSE_MODAL_DETAILS', () => {
      const action = {
          type: actions.CLOSE_MODAL_DETAILS,
          _id: "60d3b41abdacab0026a733cb",
      };

      expect(ingredientsReducer({}, action))
          .toEqual({ openIngredientId: null });
    })
  }) 