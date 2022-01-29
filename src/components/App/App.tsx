import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, Register, ForgotPassword, ResetPassword, Profile/*, NotFound404*/ } from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute';
import { NoAuthRoute } from '../NoAuthRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        
        <NoAuthRoute path="/login" exact={true} type="guest">
          <LoginPage />
        </NoAuthRoute>

        <NoAuthRoute path="/register" exact={true} type="guest">
          <Register />
        </NoAuthRoute>

        <NoAuthRoute path="/forgot-password" exact={true} type="guest">
          <ForgotPassword />
        </NoAuthRoute>
        
        <NoAuthRoute path="/reset-password" exact={true} type="guest">
          <ResetPassword />
        </NoAuthRoute>

        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
