import { FC, PropsWithChildren, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import HomePageHeader from './HomePageHeader';
import Header from './Header';
import {
  usePrefetchQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useGetNanniesData } from '../hooks';
import { QUERY_KEY, SELECT_VALUES } from '../constants';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const getNannies = useGetNanniesData();
  const location = useLocation();

  const { data: filters } = useQuery({
    queryKey: [QUERY_KEY.filters],
    queryFn: () => {
      const data: string =
        queryClient.getQueryData([QUERY_KEY.filters]) || SELECT_VALUES.showAll;
      return data;
    },
  });

  usePrefetchQuery({
    queryKey: filters ? [QUERY_KEY.nannies, filters] : [QUERY_KEY.nannies],
    queryFn: () => getNannies(filters),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <div className={clsx(location.pathname === '/' && 'home-page-container ')}>
      {location.pathname === '/' ? <HomePageHeader /> : <Header />}
      <main
        className={clsx(
          'font-roboto',
          location.pathname !== '/' && 'pt-16 pb-25 font-helvetica-neue'
        )}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
