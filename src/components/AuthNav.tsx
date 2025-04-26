import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import AuthModal from './AuthModal';

export interface AuthNavProps {}

const AuthNav: FC<AuthNavProps> = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const onOpenLoginModal = () => {
    setIsLogin(true);
  };

  const onOpenRegisterModal = () => {
    setIsRegister(true);
  };

  const onCloseLoginModal = () => {
    setIsLogin(false);
  };

  const onCloseRegisterModal = () => {
    setIsRegister(false);
  };

  return (
    <div className="flex gap-2 font-medium">
      <button
        type="button"
        className="font-medium leading-6 -tracking-1 
        px-[39px] py-3.5 border-button outline-transparent 
        hover:border-(--color-white-main) primary-transition"
        onClick={onOpenLoginModal}
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
        onClick={onOpenRegisterModal}
      >
        Registration
      </button>
      <AuthModal
        isLogin={isLogin}
        isRegister={isRegister}
        onCloseLoginModal={onCloseLoginModal}
        onCloseRegisterModal={onCloseRegisterModal}
      />
    </div>
  );
};

export default AuthNav;
