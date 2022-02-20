import { store } from '../services/store';

export type TActionsKeys<T> = {
 [K in keyof T] : T[K] extends Function ? K : never
}[keyof T];
export type TActionsCreators<T> = Pick<T, TActionsKeys<T>>;
export type TActions<TCreators> = {
  [K in keyof TCreators] : TCreators[K] extends (...args: any) => infer U ? U : never
}[keyof TCreators];

export interface IDragItem {
  _id: string;
}

export interface IDropItem {
  index: number
}

export interface IIngredient {
  _id: string;
  id?: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
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
  email: string;
  name: string;
}

export interface IRegistryUser {
  name?: string;
  password: string;
  email: string;
}

export interface ILocationModal<T> {
  pathname: string;
  search: string;
  state: T;
  hash: string;
  key?: string | undefined;
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
  modal?: string
}

export interface IToken {
  accessToken?: string;
  refreshToken?: string;
}

export type JWTDeCode = {
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

export type AppDispatch = typeof store.dispatch;