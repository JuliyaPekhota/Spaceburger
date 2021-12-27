
import { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { RootState } from '../../utils/types';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import "../../styles/globals.css";
import "../../styles/fonts.css";

import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions';


function App() {
  const { ingredients, ingredientsSuccess, ingredientsRequest, ingredientsFailed } = useSelector((store: RootState) => store.ingredient);

  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      
      <main>
      
        {ingredientsFailed && <p>Произошла ошибка при получении данных</p>}
        {ingredientsRequest && <p>Загрузка...</p>}
        
        {!ingredientsFailed && !ingredientsRequest && ingredientsSuccess && ingredients.length > 0 &&
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor />
        </DndProvider>
        }
        
      </main>
      
    </>
  );
}

export default App;
