
import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import "../../styles/globals.css";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [result, setResult] = useState({
    success: false,
    data: []
  });
  
  useEffect(() => {
      fetch(URL)
      .then(res => res.json())
      .then(res => setResult({ success: true, data: res.data }))
      .catch(e => {
        console.log(e + 'error get data');
        setResult({ success: false, data: [] })
        }
      );
  }, []);

  const { success, data } = result;

  return (
    <>
      <AppHeader />
      <main>
       {success &&
        <>
          <BurgerIngredients burgers= {data} />
          <BurgerConstructor burgers= {data} />
        </>  
        }    
      </main>
    </>
  );
}

export default App;
