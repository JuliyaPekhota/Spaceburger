export interface IDataBurgers {
    burgers: IData[];
  }
  
  export interface IData {
    name: string;
    type: string;
    price: number;
    image: string;
    _id: string;
  }