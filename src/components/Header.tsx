import { FC } from 'react';
import Navigation from './Navigation';
import AuthNav from './AuthNav';
import UserMenu from './UserMenu';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const isLogin = false;

  return (
    <header className="relative bg-green-main">
      <div className="header-container">
        <p className="text-2xl font-medium leading-4 -tracking-2">
          Nanny.Services
        </p>
        <div className="flex items-center text-base leading-6 -tracking-1 gap-[217px]">
          <Navigation />
          {isLogin ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </header>
  );
};

export default Header;
