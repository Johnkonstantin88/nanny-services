import { FC } from 'react';
import ReactModal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Icon from './Icon';

export interface AuthModalProps {
  isLogin: boolean;
  isRegister: boolean;
  onCloseLoginModal: () => void;
  onCloseRegisterModal: () => void;
}

const customStyles = {
  overlay: {
    height: '100vh',
    backgroundColor: 'rgba(11, 11, 11, 0.6)',
    zIndex: 99,
  },

  content: {
    display: 'flex',
    flexDiraction: 'column',
    padding: '64px',
    width: '566px',
    minHeight: '490px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: '30px',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

const AuthModal: FC<AuthModalProps> = ({
  isLogin,
  isRegister,
  onCloseLoginModal,
  onCloseRegisterModal,
}) => {
  return (
    <>
      <ReactModal
        isOpen={isLogin}
        closeTimeoutMS={200}
        onRequestClose={onCloseLoginModal}
        style={customStyles}
        ariaHideApp={false}
        shouldReturnFocusAfterClose={false}
      >
        <button className="absolute top-7 right-7" onClick={onCloseLoginModal}>
          <Icon name={'icon-close-converted'} width={32} height={32} />
        </button>
        <LoginForm onCloseLoginModal={onCloseLoginModal} />
      </ReactModal>
      <ReactModal
        isOpen={isRegister}
        closeTimeoutMS={200}
        onRequestClose={onCloseRegisterModal}
        style={customStyles}
        ariaHideApp={false}
        shouldReturnFocusAfterClose={false}
      >
        <button
          className="absolute top-7 right-7"
          onClick={onCloseRegisterModal}
        >
          <Icon name={'icon-close-converted'} width={32} height={32} />
        </button>
        <RegisterForm onCloseRegisterModal={onCloseRegisterModal} />
      </ReactModal>
    </>
  );
};

export default AuthModal;
