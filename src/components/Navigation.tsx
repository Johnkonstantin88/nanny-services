import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  return (
    <nav className="flex gap-10 font-normal ">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/nannies">Nannies</NavLink>
    </nav>
  );
};

export default Navigation;
