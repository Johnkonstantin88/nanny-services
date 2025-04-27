import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserState } from '../state/user';

export interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
}: PrivateRouteProps) => {
  const { data: user } = useUserState();
  //   const { isLoggedIn, isRefreshing } = useAuth();
  //   const shouldRedirect = !isLoggedIn && !isRefreshing;

  return !user ? <Navigate to={redirectTo} /> : Component;
};
