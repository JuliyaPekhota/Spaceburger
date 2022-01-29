import { useSelector } from 'react-redux';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { RootState, ILocation } from '../utils/types';

export const NoAuthRoute = ({ children, type, ...rest }: any) => {
  const isLoggedIn = useSelector((store: RootState) => store.user.authorized);
  const { pathname, state }: any = useLocation();

  const isPathFromForgotPassword = state?.from === '/forgot-password';
  const isPathResetPassword = pathname.includes("reset-password");

  if (!isPathFromForgotPassword && isPathResetPassword) {
    return <Redirect
      to={{
        pathname: '/forgot-password'
      }}
    />
  }
console.log("NoAuthRoute "+ isLoggedIn);
  return (
    <Route 
      {...rest}
      render={({ location }) => 
        type === "guest" && !isLoggedIn ? (
          children
        ) : (
            <Redirect
                to={{
                  pathname: state?.from || "/",
                  state: { from: location.pathname }
                }}
            />
        )
        }
    />
    );
} 