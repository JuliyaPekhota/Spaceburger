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

export enum TypeElement {
  Top = 'top',
  Bottom = 'bottom'
}

export enum ItemTypes  {
  IngredientInOrder = 'ingredientInOrder',
  Ingredient = 'ingredient'
}

export type RootState = ReturnType<typeof rootReducer>