
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import "../../styles/globals.css";
import data from "../../utils/data";

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients burgers= {data} />
        <BurgerConstructor burgers= {data} />
      </main>
    </>
  );
}

export default App;
