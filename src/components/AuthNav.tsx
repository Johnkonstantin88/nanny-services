import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { IModalState } from '../types/query.types';
import { QUERY_KEY } from '../constants';

export interface AuthNavProps {}

const AuthNav: FC<AuthNavProps> = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const loginModalHandler = () => {
    queryClient.setQueryData([QUERY_KEY.modalState], (prev: IModalState) => ({
      ...prev,
      isLogin: true,
    }));
  };

  const registerModalHandler = () => {
    queryClient.setQueryData([QUERY_KEY.modalState], (prev: IModalState) => ({
      ...prev,
      isRegister: true,
    }));
  };

  return (
    <div className="flex gap-2 font-medium">
      <button
        type="button"
        className="font-medium leading-6 -tracking-1 
        px-[39px] py-3.5 border-button outline-transparent 
        hover:border-(--color-white-main) primary-transition"
        onClick={loginModalHandler}
      >
        Log in
      </button>
      <button
        type="button"
        className={clsx(
          'px-10 py-3.5 bg-green-main rounded-[30px] outline-transparent',
          location.pathname === '/'
            ? 'border border-transparent hover:bg-white-main hover:text-green-main primary-transition'
            : 'border-button hover:border-(--color-white-main) primary-transition'
        )}
        onClick={registerModalHandler}
      >
        Registration
      </button>
    </div>
  );
};

export default AuthNav;
