import { createGlobalState } from '.';
import { QUERY_KEY } from '../constants';
import { IUserState } from '../types/auth.types';

export const useUserState = createGlobalState<IUserState>(QUERY_KEY.user);
