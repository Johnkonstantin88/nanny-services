import { createGlobalState } from '.';
import { QUERY_KEY } from '../constants';

export const useFavoritesState = createGlobalState<string[]>(
  QUERY_KEY.favorites
);
