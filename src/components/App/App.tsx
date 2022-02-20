import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '../Header';
import SwitchRoute from '../SwitchRoute';

export const App = () => {
  return (
    <Router>
      <Header />
      <SwitchRoute />
    </Router>
  );
}
