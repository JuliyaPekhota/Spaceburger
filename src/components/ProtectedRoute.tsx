import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { RootState, ILocationFrom } from '../utils/types';

export const ProtectedRoute = ({ children, ...rest }: any) => {
  const { authorized } = useSelector((store: RootState) => store.user);
  const isLoggedIn = authorized;
  const { pathname, state } = useLocation<ILocationFrom>();

  return (
      <Route 
        {...rest}
        render={() => {
          return isLoggedIn ? (
            children
          ) : (
            <Redirect to={
              {pathname: state?.from || '/login',
              state: {from: pathname }
            }}/>
          )
         }
      }
      />
    );
} 