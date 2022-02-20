
import { useEffect } from 'react';
import { BurgerIngredients } from '../components/BurgerIngredients';
import { BurgerConstructor }from '../components/BurgerConstructor';
import { TAppState } from '../services/reducers';
import { Loader } from '../components/Loader';
import { useAppThunkDispatch, useAppSelector } from '../utils/hooks';
import { getIngredients } from '../services/actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import "../styles/globals.css";
import "../styles/fonts.css";


export const HomePage = () => {
const { ingredients, 
        ingredientsSuccess, 
        ingredientsRequest, 
        ingredientsFailed } = useAppSelector((store: TAppState) => store.ingredient);
const dispatch = useAppThunkDispatch();

useEffect(() => {
  dispatch(getIngredients())
}, [dispatch]);

    return (
          <main>
            {ingredientsFailed && <p>Произошла ошибка при получении данных</p>}
            {ingredientsRequest && <Loader />}
            
            {ingredientsSuccess && ingredients.length > 0 &&
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
            }
          </main>
      );
}