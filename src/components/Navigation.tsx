import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUserState } from '../state/user';
import clsx from 'clsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  favoritesIdOptions,
  favoritesOptions,
} from '../queryClient/queryOptions';
import { QUERY_KEY } from '../constants';
import { useThrottle } from '../hooks';

export interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data: userData } = useUserState();
  const userId = userData?.user.uid;
  const isLoggedIn = userData?.isLoggedIn;
  const { data: favoritesId } = useQuery(favoritesIdOptions(userId));

  const prefetchFavorites = async () => {
    if (isLoggedIn && location.pathname === '/nannies') {
      await queryClient.prefetchQuery(favoritesOptions(favoritesId));
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.favorites],
      });
    }
  };

  const throttledPrefetch = useThrottle(prefetchFavorites, 2000);

  return (
    <nav
      className={clsx(
        'flex gap-10 font-normal',
        location.pathname !== '/' && 'h-8'
      )}
    >
      <NavLink to="/">Home</NavLink>
      <NavLink
        to="/nannies"
        className={({ isActive }) =>
          clsx(
            'relative flex flex-col items-center',
            isActive && 'after:current'
          )
        }
      >
        Nannies
      </NavLink>
      {location.pathname !== '/' && userData?.isLoggedIn && (
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            clsx(
              'relative flex flex-col items-center',
              isActive && 'after:current'
            )
          }
          onMouseEnter={throttledPrefetch}
          onFocus={throttledPrefetch}
        >
          Favorites
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
