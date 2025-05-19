import { DocumentData } from 'firebase/firestore';
import { createGlobalState } from '.';
import { QUERY_KEY } from '../constants';

export const useLastVisibleState = createGlobalState<DocumentData>(
  QUERY_KEY.lastVisibleDoc
);
