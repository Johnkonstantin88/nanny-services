import { FC, PropsWithChildren, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import HomePageHeader from './HomePageHeader';
import Header from './Header';
import { usePrefetchQuery } from '@tanstack/react-query';
import { useGetNanniesData } from '../hooks';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const getNannies = useGetNanniesData();
  const location = useLocation();

  usePrefetchQuery({
    queryKey: ['nannies'],
    queryFn: getNannies,
    staleTime: 60 * 60 * 1000,
  });

  return (
    <div className={clsx(location.pathname === '/' && 'home-page-container ')}>
      {location.pathname === '/' ? <HomePageHeader /> : <Header />}
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;
