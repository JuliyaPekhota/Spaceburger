
import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import "../../styles/globals.css";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [successOfData, setSuccessOfData] = useState(false);
  const [result, setResult] = useState([]);
  
  useEffect(() => {
      fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })  
      .then(response => {
        setSuccessOfData(response.success);
        setResult(response.data);
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
       {successOfData && result.length > 0 &&
        <>
          <BurgerIngredients ingredients={result} />
          <BurgerConstructor ingredients={result} />
        </>
       }    
      </main>
    </>
  );
}

export default App;
