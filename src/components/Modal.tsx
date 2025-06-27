import { FC, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ReactModal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AppointmentForm from './AppointmentForm';
import Icon from './Icon';
import { resetBodyPadding } from '../utils/resetBodyPadding';
import { IModalState } from '../types/query.types';
import { initialModalState, QUERY_KEY } from '../constants';
import { useLocation } from 'react-router-dom';

const overlay = {
  height: '100vh',
  backgroundColor: 'rgba(11, 11, 11, 0.6)',
  zIndex: 99,
};

const content = {
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
};

const authModalStyles = {
  overlay,
  content,
};

const appointmentModalStyles = {
  overlay,
  content: {
    ...content,
    width: '620px',
    height: '720px',
  },
};

ReactModal.setAppElement('#root');

const Modal: FC = () => {
  const location = useLocation();
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

  const { isAppointment, isLogin, isRegister } = modalData || initialModalState;

  const paddingOffset = window.innerWidth - document.body.clientWidth;
  paddingOffsetRef.current = paddingOffset;

  const onAfterOpen = () => {
    if (paddingOffsetRef.current && location.pathname !== '/') {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${paddingOffsetRef.current}px`;
    } else {
      document.body.style.overflowY = 'scroll';
    }
  };

  const onCloseModal = () => {
    queryClient.setQueryData([QUERY_KEY.modalState], initialModalState);
    resetBodyPadding();
  };

  return (
    <>
      <ReactModal
        isOpen={isAppointment}
        closeTimeoutMS={250}
        onAfterOpen={() => onAfterOpen()}
        onRequestClose={onCloseModal}
        style={appointmentModalStyles}
        ariaHideApp={false}
        shouldReturnFocusAfterClose={false}
      >
        <button className="absolute top-7 right-7" onClick={onCloseModal}>
          <Icon name={'icon-close-converted'} width={32} height={32} />
        </button>
        <AppointmentForm />
      </ReactModal>
      <ReactModal
        isOpen={isLogin}
        closeTimeoutMS={250}
        onAfterOpen={() => onAfterOpen()}
        onRequestClose={onCloseModal}
        style={authModalStyles}
        ariaHideApp={false}
        shouldReturnFocusAfterClose={false}
      >
        <button className="absolute top-7 right-7" onClick={onCloseModal}>
          <Icon name={'icon-close-converted'} width={32} height={32} />
        </button>
        <LoginForm />
      </ReactModal>
      <ReactModal
        isOpen={isRegister}
        closeTimeoutMS={250}
        onAfterOpen={() => onAfterOpen()}
        onRequestClose={onCloseModal}
        style={authModalStyles}
        ariaHideApp={false}
        shouldReturnFocusAfterClose={false}
      >
        <button className="absolute top-7 right-7" onClick={onCloseModal}>
          <Icon name={'icon-close-converted'} width={32} height={32} />
        </button>
        <RegisterForm />
      </ReactModal>
    </>
  );
};

export default Modal;
