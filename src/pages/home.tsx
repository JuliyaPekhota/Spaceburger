
import { useEffect } from 'react';
import AppHeader from '../components/AppHeader/AppHeader';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import { RootState } from '../utils/types';
import { Loader } from '../components/Loader/Loader';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import "../styles/globals.css";
import "../styles/fonts.css";

import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../services/actions';

export const HomePage = () => {
const { ingredients, 
        ingredientsSuccess, 
        ingredientsRequest, 
        ingredientsFailed } = useSelector((store: RootState) => store.ingredient);

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getIngredients())
}, [dispatch]);

    return (
        <>
          <AppHeader />
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
        </>
      );
}