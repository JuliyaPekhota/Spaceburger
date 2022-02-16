import { MouseEvent } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { HomePage, LoginPage, Register, ForgotPassword, ResetPassword, Profile/*, NotFound404*/ } from '../pages';
import { IngredientDetails } from '../components/IngredientDetails';
import ProfileOrders from '../components/ProfileOrders/ProfileOrders';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Modal } from './Modal';
import { closeModalDetails } from '../services/actions/actionsIngredient';
import { ILocationModal } from '../utils/types';

const SwitchRoute = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<{ modal: ILocationModal<unknown> }>();
  const modal = location.state && location.state?.modal;
  const history = useHistory();

  const handleCloseModal = (event: MouseEvent | undefined) => {
    event?.stopPropagation();
    history.goBack();
    dispatch(closeModalDetails());
}  

  return (
      <>
        <Switch location={modal || location}>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/ingredients/:id">
            <IngredientDetails type="page"/>
          </Route>
          
          <PublicRoute path="/login" exact={true} type="guest">
            <LoginPage />
          </PublicRoute>

          <PublicRoute path="/register" exact={true} type="guest">
            <Register />
          </PublicRoute>

          <PublicRoute path="/forgot-password" exact={true} type="guest">
            <ForgotPassword />
          </PublicRoute>
          
          <PublicRoute path="/reset-password" exact={true} type="guest">
            <ResetPassword />
          </PublicRoute>

          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfileOrders />
          </ProtectedRoute>
        </Switch>

        {modal && <Route path="/ingredients/:id" children={<Modal onClose={handleCloseModal} header="Детали ингредиента"><IngredientDetails /></Modal>} />}
      </>
  );
}

export default SwitchRoute;
