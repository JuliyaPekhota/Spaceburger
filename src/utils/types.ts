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