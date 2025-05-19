import { Toaster } from 'react-hot-toast';
import { FC } from 'react';

const toastStyles = {
  border: '1px solid var(--color-green-main)',
  padding: '10px',
  fontSize: '16px',
  color: 'var(--color-green-main)',
  backgroundColor: 'var(--color-white-main)',
};

const Notification: FC = () => {
  return <Toaster position="top-right" toastOptions={{ style: toastStyles }} />;
};

export default Notification;
