import { rootReducer } from '../services/reducers';

export interface IDataIngredients {
  ingredients: IData[];
}
  
export interface IData {
  name: string;
  type: string;
  price: number;
  image: string;
  _id: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
}

export enum TypeElement {
  Top = 'top',
  Bottom = 'bottom'
}

export enum ItemTypes  {
  IngredientInOrder = 'ingredientInOrder',
  Ingredient = 'ingredient'
}

export interface IDataOfCard {
  cardData: IData[];
  position?: string;
  index?: number;
  moveInOrder?: (dragIndex: number, hoverIndex: number) => void;
}

export type RootState = ReturnType<typeof rootReducer>