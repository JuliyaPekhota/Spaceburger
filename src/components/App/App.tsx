
import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import "../../styles/globals.css";
import "../../styles/fonts.css";
import { IngredientsContext } from '../../services/ingredientsContext';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isIngredientsLodaded, setIsIngredientsLodaded] = useState(false);
  
  useEffect(() => {
      fetch(INGREDIENTS_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })  
      .then(response => {
        setIsIngredientsLodaded(response.success);
        setIngredients(response.data);
      })
      .catch(error => {
          console.error('There has been a problem with fetch operation:', error);
        }
      );
  }, []);

  return (
    <>
      <AppHeader />
      <main>
       {isIngredientsLodaded && ingredients.length > 0 &&
        <>
          <BurgerIngredients ingredients={ingredients} />
          <IngredientsContext.Provider value={ingredients}>
            <BurgerConstructor/>
          </IngredientsContext.Provider>
        </>
       }    
      </main>
    </>
  );
}

export default App;
