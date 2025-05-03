import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUserState } from '../state/user';
import clsx from 'clsx';

export interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const location = useLocation();
  const { data: user } = useUserState();
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
      {location.pathname !== '/' && user?.isLoggedIn && (
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            clsx(
              'relative flex flex-col items-center',
              isActive && 'after:current'
            )
          }
        >
          Favorites
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
