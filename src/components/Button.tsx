import { FC } from 'react';

export interface ButtonProps {
  className: string;
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  type,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
