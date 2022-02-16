import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { ILocationFrom } from '../utils/types';
import { TAppState } from '../services/reducers';

interface IProtectedRouteProps extends RouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children, ...rest }: IProtectedRouteProps) => {
  const { authorized } = useSelector((store: TAppState) => store.user);
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