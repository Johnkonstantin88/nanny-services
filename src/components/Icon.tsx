import { FC } from 'react';

export interface IconProps {
  name: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Icon: FC<IconProps> = ({ name, className, width, height }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`/public/sprite.svg#${name}`}></use>
    </svg>
  );
};

export default Icon;
