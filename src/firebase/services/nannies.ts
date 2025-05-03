import { get, ref, query, limitToFirst } from 'firebase/database';
import { db } from '../firebaseConfig';
import { FirebaseResponse } from '../../types/firebase.types';

export const getNannies = async (): Promise<FirebaseResponse[] | undefined> => {
  const nanniesRef = query(ref(db, 'nannies'), limitToFirst(3));
  const response = await get(nanniesRef);

  if (response.exists()) return response.val();
};
