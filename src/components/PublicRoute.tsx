import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { RootState, ILocationFrom } from '../utils/types';

export const PublicRoute = ({ children, type, ...rest }: any) => {
  const { authorized } = useSelector((store: RootState) => store.user);
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