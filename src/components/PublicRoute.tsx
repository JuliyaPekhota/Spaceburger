import { ReactNode } from 'react';
import { useAppSelector } from '../utils/hooks';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { ILocationFrom } from '../utils/types';

interface IPublicRouteProps extends RouteProps {
  children: ReactNode;
  type: string;
}

export const PublicRoute = ({ children, type, ...rest }: IPublicRouteProps) => {
  const isLoggedIn = useAppSelector(store => store.user.authorized);
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