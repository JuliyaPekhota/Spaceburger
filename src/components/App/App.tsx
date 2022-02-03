import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import SwitchRoute from '../SwitchRoute';

const App = () => {
  return (
    <Router>
      <AppHeader />
      <SwitchRoute />
    </Router>
  );
}

export default App;
