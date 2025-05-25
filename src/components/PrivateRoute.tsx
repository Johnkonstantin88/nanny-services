import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserState } from '../state/user';
import { useIsRestoring } from '@tanstack/react-query';

export interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
}: PrivateRouteProps) => {
  const { data: user } = useUserState();
  const isRestoring = useIsRestoring();
  const shouldRedirect = !user && !isRestoring;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
