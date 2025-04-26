import { FC } from 'react';
import Icon from './Icon';
import { useUserState } from '../state/user';
import { useSignOut } from '../hooks';

export interface UserMenuProps {}

const UserMenu: FC<UserMenuProps> = () => {
  const { data } = useUserState();
  const signOut = useSignOut();

  return (
    <div className="flex gap-6 ">
      <div className="flex gap-3.5 justify-center items-center">
        <Icon
          name={'icon-person'}
          width={40}
          height={40}
          className={'rounded-[10px]'}
        />
        <span className="font-medium leading-3 -tracking-1">
          {data?.user.displayName}
        </span>
      </div>
      <button
        className="font-medium leading-6 -tracking-1 
        px-[39px] py-3.5 border-button outline-transparent 
        hover:border-(--color-white-main) primary-transition"
        onClick={() => signOut()}
      >
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
