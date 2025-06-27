import { CSSProperties, FC } from 'react';
import { PuffLoader } from 'react-spinners';

export interface LoaderProps {}

const override: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  display: 'block',
  margin: '0 auto',
  zIndex: 999,
  transform: 'translate(-50%, -50%)',
};

const Loader: FC<LoaderProps> = () => {
  return (
    <PuffLoader
      color={'var(--color-green-main)'}
      loading={true}
      cssOverride={override}
      size={60}
      aria-label="Loading Spinner"
      speedMultiplier={1}
    />
  );
};

export default Loader;
