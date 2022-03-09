import { MouseEvent } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { HomePage, LoginPage, Register, ForgotPassword, ResetPassword, Feed, Profile, ProfileOrders, NotFound404 } from '../pages';
import { IngredientDetails } from '../components/IngredientDetails';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Modal } from './Modal';
import { closeModalDetails } from '../services/actions/actionsIngredient';
import { ILocationProps } from '../utils/types';
import { FeedDetails } from './FeedDetails';

const SwitchRoute = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<ILocationProps>();
  const modal = location.state && location.state?.modal;
  const feed = location.state && location.state?.feed;
  const order = location.state && location.state?.order;
  const history = useHistory();

  const handleCloseModal = (event: MouseEvent | undefined) => {
    event?.stopPropagation();
    history.goBack();
    dispatch(closeModalDetails());
}  

  return (
      <>
        <Switch location={order || feed || modal || location}>
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

          <Route path="/feed" exact={true}>
            <Feed />
          </Route>

          <Route path="/feed/:id" exact={true}> 
            <FeedDetails type="page"/>
          </Route>

          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfileOrders />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:id" exact={true}>
            <FeedDetails type="page" variant="orders"/>
          </ProtectedRoute>

          <Route component={NotFound404} />
        </Switch>

        {modal && <Route path="/ingredients/:id" children={<Modal onClose={handleCloseModal} header="Детали ингредиента"><IngredientDetails /></Modal>} />}
        {feed && <Route path="/feed/:id" children={<Modal onClose={handleCloseModal}><FeedDetails /></Modal>} />}
        {order && <Route path="/profile/orders/:id" children={<Modal onClose={handleCloseModal}><FeedDetails /></Modal>} />}
      </>
  );
}

export default SwitchRoute;
