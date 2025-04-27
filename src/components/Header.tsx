import { FC } from 'react';
import { useUserState } from '../state/user';
import Navigation from './Navigation';
import AuthNav from './AuthNav';
import UserMenu from './UserMenu';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { data: user } = useUserState();

  return (
    <header className="relative bg-green-main">
      <div className="header-container">
        <p className="text-2xl font-medium leading-4 -tracking-2">
          Nanny.Services
        </p>
        <div className="flex items-center text-base leading-6 -tracking-1 gap-[217px]">
          <Navigation />
          {user?.isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </header>
  );
};

export default Header;
