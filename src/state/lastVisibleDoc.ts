import { DocumentData } from 'firebase/firestore';
import { createGlobalState } from '.';

export const useLastVisibleState =
  createGlobalState<DocumentData>('last-visible-doc');
