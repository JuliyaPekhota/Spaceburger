import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../utils/types';

export const ProtectedRoute = ({ children, ...rest }: any) => {
  const isLoggedIn = useSelector((store: RootState) => store.user.authorized);

  console.log("ProtectedRoute" +isLoggedIn);
  return (
      <Route 
        {...rest}
        render={({ location }) =>
         isLoggedIn ? (
            children
          ) : (
            <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location.pathname }
                }}
            />
          )
      }
      />
    );
} 