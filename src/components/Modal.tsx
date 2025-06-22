import { FC } from 'react';
import ReactModal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Icon from './Icon';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IModalState } from '../types/query.types';
import { initialModalState, QUERY_KEY } from '../constants';
import AppointmentForm from './AppointmentForm';

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
  content: { ...content, width: '620px', height: '720px' },
};

ReactModal.setAppElement('#root');

const Modal: FC = () => {
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

  const onCloseModal = () => {
    queryClient.setQueryData([QUERY_KEY.modalState], initialModalState);
  };

  return (
    <>
      <ReactModal
        isOpen={isAppointment}
        closeTimeoutMS={200}
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
        closeTimeoutMS={200}
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
        closeTimeoutMS={200}
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
