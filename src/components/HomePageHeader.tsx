import { FC } from 'react';
import Navigation from './Navigation';
import AuthNav from './AuthNav';
import UserMenu from './UserMenu';
import { useUserState } from '../state/user';

export interface HomePageHeaderProps {}

const HomePageHeader: FC<HomePageHeaderProps> = () => {
  const { data: user } = useUserState();

  return (
    <header className="home-header-container font-roboto">
      <p className="text-2xl font-medium leading-4 -tracking-2">
        Nanny.Services
      </p>
      <div className="flex items-center text-base leading-6 -tracking-1 gap-23">
        <Navigation />
        {user?.isLoggedIn ? <UserMenu /> : <AuthNav />}
      </div>
    </header>
  );
};

export default HomePageHeader;
