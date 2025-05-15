import { FC } from 'react';

export interface ButtonProps {
  className: string;
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ className, type, onClick, children }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
