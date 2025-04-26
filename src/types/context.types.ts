import { Dispatch, SetStateAction } from 'react';
import { IUser } from './auth.types';

export type TUserState = IUser | null;

export interface IContext {
  user: TUserState;
  setUser: Dispatch<SetStateAction<TUserState>>;
}
