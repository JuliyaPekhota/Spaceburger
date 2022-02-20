import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { ILocationFrom } from '../utils/types';
import { TAppState } from '../services/reducers';

interface IPublicRouteProps extends RouteProps {
  children: ReactNode;
  type: string;
}

export const PublicRoute = ({ children, type, ...rest }: IPublicRouteProps) => {
  const { authorized } = useSelector((store: TAppState) => store.user);
  const isLoggedIn = authorized;
  const { pathname, state } = useLocation<ILocationFrom>();

 const isPathFromForgotPassword = state?.from === '/forgot-password';
 const isPathResetPassword = pathname.includes("reset-password");

 if (!isPathFromForgotPassword && isPathResetPassword) {
    return <Redirect
      to={{
        pathname: '/forgot-password'
      }}
    />
  }

  return (
    <Route 
      {...rest}
      render={() => 
        type === "guest" && !isLoggedIn ? (
          children
        ) : (
            <Redirect
                to={{
                  pathname: state?.from || "/",
                  state: { from: pathname }
                }}
            />
        )
        }
    />
    );
} 