import { EWsStatus, IWsMessageOrder, IIngredient } from './types';

export const sortByDate = (a: IWsMessageOrder, b: IWsMessageOrder) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

export const returnStatus = (status: string): string => {
    switch (status) {
        case EWsStatus.Done:
            return "Выполнен";
        case EWsStatus.Created:
            return "Создан";
        case EWsStatus.Pending:
            return "В работе"; 
        case EWsStatus.Cancel:
            return "Отменен";        
        default: 
            return "Не известен";
      }
}

export const getDayPhrase = (rawDay: Date): string => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - rawDay.getTime());
    const differentDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let result: string;

    switch (true) {
      case differentDate === 0:
        result ="Сегодня ";
        break;
      case differentDate === 1:
        result ="Вчера ";
        break;
      case differentDate > 1 && differentDate <= 4:
        result = `${differentDate} дня назад `;
        break; 
      default:
        result = `${differentDate} дней назад `;
    }

    return result;
  } 

export const getDate = (date: string): string => {
      const dateRaw = new Date(date);

      const resultDay = getDayPhrase(dateRaw);
      const resultTime = `${('0'+ dateRaw.getHours()).slice(-2)}:${('0'+ dateRaw.getMinutes()).slice(-2)}`;
      const resultTimeZoneOffsetInHours = " i-GMT"+ (dateRaw.getTimezoneOffset() / 60).toString().replace("-","+");

      return resultDay + resultTime + resultTimeZoneOffsetInHours;
}

export const getOrderCost = (ingredients: IIngredient[], ids: string[]): number => {
  const selectIngredients: IIngredient[] = getSelectIngredients(ingredients, ids);
  return selectIngredients.reduce((sum, { price, type }) => type === 'bun' ? sum + price * 2 : sum + price, 0)
}

export const getIngredient = (ingredients: IIngredient[], idIngredientsOrder: string): IIngredient => {
  return ingredients.filter(item => item._id === idIngredientsOrder)[0];
}

export const getSelectIngredients = (ingredients: IIngredient[], ids: string[]): IIngredient[] => {
  const selectIngredients: IIngredient[] = [];
  ids
      .filter((item, index) => ids.indexOf(item) === index)
      .forEach((id: string | null) => id !== null ? selectIngredients.push(getIngredient(ingredients, id)) : "");
  return selectIngredients; 
}

export const getAccessToken = (): string => {
  const tokens = localStorage.getItem('tokens') ?? null;
  let accessToken = null;
  if (tokens !== null) {
    const token = JSON.parse(localStorage.getItem("tokens") ?? "null");
    accessToken = token.accessToken;
  }
  return accessToken;
}



