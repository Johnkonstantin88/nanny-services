import { createGlobalState } from '.';
import { IUserState } from '../types/auth.types';

export const useUserState = createGlobalState<IUserState>('user');
