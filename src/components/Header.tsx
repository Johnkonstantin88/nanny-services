import { CSSProperties, FC, useRef } from 'react';
import { useUserState } from '../state/user';
import Navigation from './Navigation';
import AuthNav from './AuthNav';
import UserMenu from './UserMenu';
import {
  useIsRestoring,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { initialModalState, QUERY_KEY } from '../constants';
import { IModalState } from '../types/query.types';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { data: user } = useUserState();
  const isRestoring = useIsRestoring();
  const paddingOffsetRef = useRef<number>(0);
  const queryClient = useQueryClient();
  const { data: modalData } = useQuery({
    queryKey: [QUERY_KEY.modalState],
    queryFn: () => {
      const data: IModalState =
        queryClient.getQueryData([QUERY_KEY.modalState]) || initialModalState;
      return data;
    },
  });

  const { isLogin, isRegister } = modalData || initialModalState;
  const isOpen = isLogin || isRegister;

  const paddingOffset = window.innerWidth - document.body.clientWidth;
  paddingOffsetRef.current = paddingOffset;

  const after = {
    content: '',
    position: 'fixed',
    top: 0,
    right: 0,
    backgroundColor: 'var(--color-green-main)',
    width: `${paddingOffsetRef.current}px`,
    height: '88px',
  } as CSSProperties;

  return isRestoring ? (
    <p className="text-center">Refreshing...</p>
  ) : (
    <header className="relative bg-green-main w-full">
      {isOpen && <span style={after}></span>}
      <div className="header-container font-roboto">
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
