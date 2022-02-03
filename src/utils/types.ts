import { rootReducer } from '../services/reducers';

export interface IDataIngredients {
  ingredients: IIngredient[];
}

export interface IIngredient {
  _id: string;
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
}

export interface IDataOfIngredient {
  position?: string;
  index?: number;
  moveInOrder?: (dragIndex: number, hoverIndex: number) => void;
  _id: string;
}

export interface IPasswordData {
  password: string;
  token: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IRegistryUser {
  name?: string;
  password: string;
  email: string;
}

export interface ILocation {
  hash: string;
  key: string;
  pathname?: string;
  search: string;
  state?: ILocationFrom;
}

export interface ILocationFrom {
  from: string;
}

export interface IToken {
  accessToken?: string;
  refreshToken?: string;
}

export type JWTDeCode  = {
  iat: number,
  exp: number
}

export enum TypeElement {
  Top = 'top',
  Bottom = 'bottom'
}

export enum ItemTypes  {
  IngredientInOrder = 'ingredientInOrder',
  Ingredient = 'ingredient'
}

export enum TokenTypes  {
  Expired = 'jwt expired',
}

export type RootState = ReturnType<typeof rootReducer>