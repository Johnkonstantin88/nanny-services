import { FC, PropsWithChildren, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import HomePageHeader from './HomePageHeader';
import Header from './Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  return (
    <div className={clsx(location.pathname === '/' && 'home-page-container')}>
      {location.pathname === '/' ? <HomePageHeader /> : <Header />}
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;
