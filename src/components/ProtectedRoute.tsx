import { ReactNode } from 'react';
import { useAppSelector } from '../utils/hooks';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { ILocationFrom } from '../utils/types';

interface IProtectedRouteProps extends RouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children, ...rest }: IProtectedRouteProps) => {
  const isLoggedIn = useAppSelector(store => store.user.authorized);
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