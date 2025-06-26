import { FC, PropsWithChildren, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import ScrollUpBtn from './ScrollUpBtn';
import Modal from './Modal';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Header />}
      <Suspense fallback={null}>{children}</Suspense>
      <Modal />
      <ScrollUpBtn />
    </>
  );
};

export default Layout;
